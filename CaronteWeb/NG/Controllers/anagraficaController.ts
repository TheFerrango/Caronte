module Caronte {
	interface IAppCtrlScope extends ng.IScope {
		currentPage: number;
		pageNumbers: number[];

		anagraficaList: any;
		popupAna: any;

		isMapShowing: boolean;

		newAnagrafica: Function;
		editAnagrafica: Function;
		okEdit: Function;
		cancelEdit: Function;
		removeAnagrafica: Function;
		showPage: Function;


		submittami: Function;
		centerBingMap: Function;
		showMapDiv: Function;
		okMapPosition: Function;
		cancelMapPosition: Function;
	}

	export class anagraficaController {
		static $inject = ["$scope", "anagraficaService"];
		scope: IAppCtrlScope;
		service: anagraficaService;
		mapOptions: Microsoft.Maps.ViewOptions;
		mapObj: Microsoft.Maps.Map;
		pushPin: Microsoft.Maps.Pushpin;
		totalItems: number;
		howMany: number;

		constructor(private $scope: IAppCtrlScope, persServ: anagraficaService) {
			this.scope = $scope;
			this.service = persServ;
			this.scope.pageNumbers = [];
			this.scope.currentPage = 0;
			this.howMany = 15
			this.showPage(0);
			this.scope.popupAna = {};
			

			this.initBindMetodi();
			this.initMappa();
		}

		//#region Inizializzazione

		private initBindMetodi() {
			this.scope.newAnagrafica = () => this.newAnagrafica();
			this.scope.editAnagrafica = (anaObj) => this.editAnagrafica(anaObj);
			this.scope.okEdit = (form) => this.okEdit(form);
			this.scope.cancelEdit = () => this.cancelEdit();
			this.scope.removeAnagrafica = (idAna) => this.removeAnagrafica(idAna);
			this.scope.showPage = (numPagina) => this.showPage(numPagina);
			this.scope.showMapDiv = () => this.showTabMappa()
			this.scope.centerBingMap = () => this.getLocationFromAddress(this.scope.popupAna.TmpIndirizzo);
			this.scope.okMapPosition = () => this.okMapPosition();
			this.scope.cancelMapPosition = () => this.cancelMapPosition();
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

		private showTabMappa() {
			this.scope.isMapShowing = true;
			this.scope.popupAna.TmpIndirizzo = this.scope.popupAna.obj.Indirizzo;
			this.mapOptions.center = new Microsoft.Maps.Location(this.scope.popupAna.obj.Latitude, this.scope.popupAna.obj.Longitude);
			this.mapOptions.zoom = 13;
			this.pushPin.setLocation(new Microsoft.Maps.Location(this.scope.popupAna.obj.Latitude, this.scope.popupAna.obj.Longitude));
			this.mapObj.setView(this.mapOptions);
		}

		private okMapPosition() {
			var currentPos = this.pushPin.getLocation();
			this.scope.popupAna.obj.Latitude = currentPos.latitude;
			this.scope.popupAna.obj.Longitude = currentPos.longitude;
			this.scope.popupAna.obj.Indirizzo = this.scope.popupAna.TmpIndirizzo;
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
			this.service.getAnagrafiche(this.scope.currentPage, this.howMany,(data) => {
				this.scope.anagraficaList = data["Dati"];
				this.totalItems = data["Totale"]
				this.scope.pageNumbers = this.makeRange();

			});
		}

		//#endregion

		//#region Aggiunta, modifica ed eliminazione

		private newAnagrafica() {
			var dlg = $("#dialog").data('dialog');
			this.scope.popupAna.type = "Aggiungi";
			this.scope.popupAna.obj = {};
			this.scope.popupAna.obj.Sesso = true.toString();
			this.scope.popupAna.obj.Latitude = 44.22;
			this.scope.popupAna.obj.Longitude = 11.6;

			dlg.open()
		}

		private editAnagrafica(anaObj) {
			var dlg = $("#dialog").data('dialog');
			this.scope.popupAna.type = "Modifica";

			this.scope.popupAna.obj = {};
			this.scope.popupAna.obj.IDAnagrafica = anaObj.IDAnagrafica;
			this.scope.popupAna.obj.Nome = anaObj.Nome;
			this.scope.popupAna.obj.Cognome = anaObj.Cognome;
			this.scope.popupAna.obj.CodiceFiscale = anaObj.CodiceFiscale;
			this.scope.popupAna.obj.DataNascita = anaObj.DataNascita;
			this.scope.popupAna.obj.Sesso = anaObj.Sesso.toString();
			this.scope.popupAna.obj.Telefono = anaObj.Telefono;
			this.scope.popupAna.obj.Cellulare = anaObj.Cellulare;
			this.scope.popupAna.obj.Email = anaObj.Email;
			this.scope.popupAna.obj.Indirizzo = anaObj.Indirizzo;
			this.scope.popupAna.obj.Latitude = anaObj.Latitude;
			this.scope.popupAna.obj.Longitude = anaObj.Longitude;
			
			dlg.open()

		}

		private okEdit(form: angular.IFormController) {
			//if($("formToVal")[0]
			if (form.$valid) {
				this.scope.popupAna.obj.DataNascita = $("#newDate").val();

				if (this.scope.popupAna.type == "Modifica") {
					this.service.editAnagrafica(this.scope.popupAna.obj,
						(result) => {
							if (result) {
								(<any>$).Notify({
									caption: 'Modifica',
									content: 'Anagrafica modificata con successo!',
									type: 'success'
								})
								this.service.getAnagrafiche(this.scope.currentPage, this.howMany,(data) => {
									this.$scope.anagraficaList = data["Dati"];
								});
								this.cancelEdit();
							}
						},
						() => {
							(<any>$).Notify({
								caption: 'Modifica',
								content: 'Si è verificato un errore durante la modifica dell\'anagrafica',
								type: 'alert'
							})
							this.service.getAnagrafiche(this.scope.currentPage, this.howMany,(data) => {
								this.$scope.anagraficaList = data["Dati"];
							});
						});
				} else {
					this.service.createAnagrafica(this.scope.popupAna.obj,
						(result) => {
							if (result) {
								(<any>$).Notify({
									caption: 'Modifica',
									content: 'Anagrafica creata con successo!',
									type: 'success'
								})
								this.service.getAnagrafiche(this.scope.currentPage, this.howMany,(data) => {
									this.$scope.anagraficaList = data["Dati"];
								});
								this.cancelEdit();
							}
						},
						() => {
							(<any>$).Notify({
								caption: 'Modifica',
								content: 'Si è verificato un errore durante la creazione dell\'anagrafica',
								type: 'alert'
							})
							this.service.getAnagrafiche(this.scope.currentPage, this.howMany,(data) => {
								this.$scope.anagraficaList = data["Dati"];
							});
						});
				}
			}
		}

		private cancelEdit() {
			var dlg = $('#dialog').data('dialog');
			dlg.close();
		}

		private removeAnagrafica(idAna) {
			if (confirm("Sei sicuro di voler eliminare questa anagrafica?")) {
				this.service.deleteAnagrafica(idAna,(result) => {
					if (result) {
						(<any>$).Notify({
							caption: 'Eliminazione',
							content: 'Anagrafica eliminata con successo!',
							type: 'success'
						})
						this.service.getAnagrafiche(this.scope.currentPage, this.howMany,(data) => {
							this.scope.anagraficaList = data["Dati"];
							this.totalItems = data["Totale"]
							this.scope.pageNumbers = this.makeRange();
						});
					}
				},
					() => {
						(<any>$).Notify({
							caption: 'Eliminazione',
							content: 'Si è verificato un errore durante l\'eliminazione dell\'anagrafica',
							type: 'alert'
						})
						this.service.getAnagrafiche(this.scope.currentPage, this.howMany,(data) => {
							this.$scope.anagraficaList = data["Dati"];
							this.totalItems = data["Totale"]
							this.scope.pageNumbers = this.makeRange();
						});
					});
			}
		}

		//#endregion
	}
}