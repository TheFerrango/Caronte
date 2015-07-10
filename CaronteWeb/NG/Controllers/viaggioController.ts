module Caronte {
	interface IAppCtrlScope extends ng.IScope {
		currentPage: number;
		pageNumbers: number[];

		viaggioList: any;
		dipendenteList: any;
		popupVia: any;

		isMapShowing: boolean;

		newViaggio: Function;
		editViaggio: Function;
		okEdit: Function;
		cancelEdit: Function;
		removeViaggio: Function;
		showPage: Function;

		submittami: Function;
		centerBingMap: Function;
		showMapDiv: Function;
		okMapPosition: Function;
		cancelMapPosition: Function;

		newPasseggero: Function;
		closePasseggeri: Function;
	}

	export class viaggioController {
		static $inject = ["$scope", "viaggioService"];
		cheMappa: string;
		scope: IAppCtrlScope;
		service: viaggioService;
		mapOptions: Microsoft.Maps.ViewOptions;
		mapObj: Microsoft.Maps.Map;
		pushPin: Microsoft.Maps.Pushpin;
		totalItems: number;
		howMany: number;

		constructor(private $scope: IAppCtrlScope, persServ: viaggioService) {
			this.scope = $scope;
			this.service = persServ;
			this.scope.pageNumbers = [];
			this.scope.dipendenteList = [];
			this.scope.currentPage = 0;
			this.howMany = 15
			this.showPage(0);
			this.scope.popupVia = {};

			this.initControlli();
			this.initBindMetodi();
			this.initMappa();
		}

		//#region Inizializzazione

		private initControlli() {
			this.service.getDipendentiFilter(2,(data) => {
				this.scope.dipendenteList = data["Dati"];
			});
		}

		private initBindMetodi() {
			this.scope.newViaggio = () => this.newViaggio();
			this.scope.editViaggio = (viaObj) => this.editViaggio(viaObj);
			this.scope.okEdit = (form) => this.okEdit(form);
			this.scope.cancelEdit = () => this.cancelEdit();
			this.scope.removeViaggio = (idVia) => this.removeViaggio(idVia);
			this.scope.showPage = (numPagina) => this.showPage(numPagina);
			this.scope.showMapDiv = (whichAddr) => this.showTabMappa(whichAddr)
			this.scope.centerBingMap = () => this.getLocationFromAddress(this.scope.popupVia.TmpIndirizzo);
			this.scope.okMapPosition = () => this.okMapPosition();
			this.scope.cancelMapPosition = () => this.cancelMapPosition();

			this.scope.newPasseggero = () => this.newPasseggero();
			this.scope.closePasseggeri = () => this.closePasseggeri();
		}

		private initMappa() {
			Microsoft.Maps.loadModule("Microsoft.Maps.Search");
			this.mapObj = new Microsoft.Maps.Map($("#mappaBing")[0], { credentials: "AvCv3p-UgCnQsBKohLfG71_6FT84OovVPBups8s28O5U6fEEXj9BSMFU3NX1Ee5N" })

			this.mapOptions = {};
			this.mapOptions.center = new Microsoft.Maps.Location(0, 0);
			this.mapOptions.zoom = 6;
			this.mapOptions.mapTypeId = 'a';
			this.mapObj.setView(this.mapOptions);
			this.pushPin = new Microsoft.Maps.Pushpin(this.mapOptions.center, {
				draggable: true,
			});
			this.mapObj.entities.insert(this.pushPin, 0);
		}

		//#endregion

		//#region Gestione Tab mappa

		private getLocationFromAddress(address: string) {
			var grOpts: Microsoft.Maps.Search.GeocodeRequestOptions;
			grOpts = {
				where: address,
				callback: (result, userData) => {
					if (result.results.length > 0) {
						this.scope.$apply(() => {
							this.mapOptions.center = result.results[0].location;
							this.mapOptions.zoom = 13;
							this.mapObj.setView(this.mapOptions);
							this.pushPin.setLocation(result.results[0].location);
						});
					} else (<any>$).Notify({
						caption: 'Posizione',
						content: 'L\'indirizzo richiesto non è stato trovato.',
						type: 'warning'
					})
				}
			}

			var sm = new Microsoft.Maps.Search.SearchManager
				(this.mapObj);

			sm.geocode(grOpts);
		}

		private showTabMappa(whichAddr: string) {
			this.scope.isMapShowing = true;
			if (whichAddr == "part") {
				this.scope.popupVia.TmpIndirizzo = this.scope.popupVia.obj.IndirizzoPartenza;
				this.mapOptions.center = new Microsoft.Maps.Location(this.scope.popupVia.obj.LatitudinePartenzaPrevista, this.scope.popupVia.obj.LongitudinePartenzaPrevista);
				this.pushPin.setLocation(new Microsoft.Maps.Location(this.scope.popupVia.obj.LatitudinePartenzaPrevista, this.scope.popupVia.obj.LongitudinePartenzaPrevista));
			} else {
				this.scope.popupVia.TmpIndirizzo = this.scope.popupVia.obj.IndirizzoArrivo;
				this.mapOptions.center = new Microsoft.Maps.Location(this.scope.popupVia.obj.LatitudineArrivoPrevista, this.scope.popupVia.obj.LongitudineArrivoPrevista);
				this.pushPin.setLocation(new Microsoft.Maps.Location(this.scope.popupVia.obj.LatitudineArrivoPrevista, this.scope.popupVia.obj.LongitudineArrivoPrevista));
			}

			this.mapOptions.zoom = 13;
			this.mapObj.setView(this.mapOptions);
			this.cheMappa = whichAddr;
		}

		private okMapPosition() {
			var currentPos = this.pushPin.getLocation();
			if (this.cheMappa == "part") {
				this.scope.popupVia.obj.LatitudinePartenzaPrevista = currentPos.latitude;
				this.scope.popupVia.obj.LongitudinePartenzaPrevista = currentPos.longitude;
				this.scope.popupVia.obj.IndirizzoPartenza = this.scope.popupVia.TmpIndirizzo;
			} else {
				this.scope.popupVia.obj.LatitudineArrivoPrevista = currentPos.latitude;
				this.scope.popupVia.obj.LongitudineArrivoPrevista = currentPos.longitude;
				this.scope.popupVia.obj.IndirizzoArrivo = this.scope.popupVia.TmpIndirizzo;
			}
			this.cancelMapPosition();
		}

		private cancelMapPosition() {
			this.scope.isMapShowing = false;
		}

		//#endregion

		//#region Paginazione

		private makeRange() {
			var lista = [];
			var limit: number = Math.ceil(this.totalItems / this.howMany);
			for (var idx = 0; idx < limit; idx++) {
				lista.push(idx)
			}
			return lista;
		}

		private showPage(pageToNavigate: number) {
			console.log(pageToNavigate);
			this.scope.currentPage = pageToNavigate;
			this.service.getViaggi(this.scope.currentPage, this.howMany,(data) => {
				this.scope.viaggioList = data["Dati"];
				this.totalItems = data["Totale"]
				this.scope.pageNumbers = this.makeRange();

			});
		}

		//#endregion

		//#region Aggiunta, modifica ed eliminazione

		private newViaggio() {
			var dlg = $("#dialog").data('dialog');
			this.scope.popupVia.type = "Aggiungi";
			this.scope.popupVia.obj = {};
			this.scope.popupVia.obj.Sesso = true.toString();
			this.scope.popupVia.obj.Latitude = 44.22;
			this.scope.popupVia.obj.Longitude = 11.6;

			dlg.open()
		}

		private editViaggio(viaObj) {
			var dlg = $("#dialog").data('dialog');
			this.scope.popupVia.type = "Modifica";

			this.scope.popupVia.obj = {};
			angular.copy(viaObj, this.scope.popupVia.obj)

			dlg.open()

		}

		private okEdit(form: angular.IFormController) {
			console.log(form.$error);
			if (form.$valid) {

				var DataInizio: Date = new Date($("#newDate").val());
				var DataFine: Date = new Date($("#newDate").val());

				DataInizio.setHours($("#oraStr").val().split(':')[0]);
				DataInizio.setMinutes($("#oraStr").val().split(':')[1]);

				DataFine.setHours($("#oraFin").val().split(':')[0]);
				DataFine.setMinutes($("#oraFin").val().split(':')[1]);


				this.scope.popupVia.obj.DataInizioPrevista = DataInizio;
				this.scope.popupVia.obj.DataFinePrevista = DataFine;

				if (this.scope.popupVia.type == "Modifica") {
					this.service.editViaggio(this.scope.popupVia.obj,
						(result) => {
							if (result) {
								(<any>$).Notify({
									caption: 'Modifica',
									content: 'Viaggio modificata con successo!',
									type: 'success'
								})
								this.service.getViaggi(this.scope.currentPage, this.howMany,(data) => {
									this.$scope.viaggioList = data["Dati"];
								});
								this.cancelEdit();
							}
						},
						() => {
							(<any>$).Notify({
								caption: 'Modifica',
								content: 'Si è verificato un errore durante la modifica dell\'viaggio',
								type: 'alert'
							})
							this.service.getViaggi(this.scope.currentPage, this.howMany,(data) => {
								this.$scope.viaggioList = data["Dati"];
							});
						});
				} else {
					this.service.createViaggio(this.scope.popupVia.obj,
						(result) => {
							if (result) {
								(<any>$).Notify({
									caption: 'Modifica',
									content: 'Viaggio creata con successo!',
									type: 'success'
								})
								this.service.getViaggi(this.scope.currentPage, this.howMany,(data) => {
									this.$scope.viaggioList = data["Dati"];
								});
								this.cancelEdit();
							}
						},
						() => {
							(<any>$).Notify({
								caption: 'Modifica',
								content: 'Si è verificato un errore durante la creazione dell\'viaggio',
								type: 'alert'
							})
							this.service.getViaggi(this.scope.currentPage, this.howMany,(data) => {
								this.$scope.viaggioList = data["Dati"];
							});
						});
				}
			}
		}

		private cancelEdit() {
			var dlg = $('#dialog').data('dialog');
			dlg.close();
		}

		private removeViaggio(idVia) {
			if (confirm("Sei sicuro di voler eliminare questa viaggio?")) {
				this.service.deleteViaggio(idVia,(result) => {
					if (result) {
						(<any>$).Notify({
							caption: 'Eliminazione',
							content: 'Viaggio eliminata con successo!',
							type: 'success'
						})
						this.service.getViaggi(this.scope.currentPage, this.howMany,(data) => {
							this.scope.viaggioList = data["Dati"];
							this.totalItems = data["Totale"]
							this.scope.pageNumbers = this.makeRange();
						});
					}
				},
					() => {
						(<any>$).Notify({
							caption: 'Eliminazione',
							content: 'Si è verificato un errore durante l\'eliminazione dell\'viaggio',
							type: 'alert'
						})
						this.service.getViaggi(this.scope.currentPage, this.howMany,(data) => {
							this.$scope.viaggioList = data["Dati"];
							this.totalItems = data["Totale"]
							this.scope.pageNumbers = this.makeRange();
						});
					});
			}
		}

		//#endregion


		//#region 

		private newPasseggero() {
			var dlg = $("#mgrPasseggeri").data('dialog');
			dlg.open();
		}

		private closePasseggeri() {
			console.log("chiudiPasseggeri");
		}

		//#endregion
	}
}