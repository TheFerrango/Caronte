module Caronte {
	export interface IAppCtrlScope extends ng.IScope {
		currentPage: number;
		pageNumbers: number[];

		viaggioList: any;
		dipendenteList: any;
		statoList: any;
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

		openManagePasseggeri: Function;
		closeManagePasseggeri: Function;

		//#region "Finta" schermata passeggeri

		passeggeriList: any;
		anagraficaList: any;

		currentPage_P: number;
		pageNumbers_P: number[];

		popupPas: any;

		isMapShowing_P: boolean;

		newPasseggero: Function;
		editPasseggero: Function;
		okEdit_P: Function;
		cancelEdit_P: Function;
		removePasseggero: Function;
		showPage_P: Function;

		submittami_P: Function;
		centerBingMap_P: Function;
		showMapDiv_P: Function;
		okMapPosition_P: Function;
		cancelMapPosition_P: Function;

		//#endregion
	}

	export class viaggioController {
		static $inject = ["$scope", "viaggioService", "passeggeroService"];
		cheMappa: string;
		scope: IAppCtrlScope;
		service: viaggioService;
		pService: passeggeroService;

		mapOptions: Microsoft.Maps.ViewOptions;
		mapObj: Microsoft.Maps.Map;
		pushPin: Microsoft.Maps.Pushpin;
		totalItems: number;
		howMany: number;

		// duplicati per la finta finestra
		mapOptions_P: Microsoft.Maps.ViewOptions;
		mapObj_P: Microsoft.Maps.Map;
		pushPin_P: Microsoft.Maps.Pushpin;
		totalItems_P: number;

		constructor(private $scope: IAppCtrlScope, viagServ: viaggioService, passServ: passeggeroService) {
			this.scope = $scope;
			this.service = viagServ;
			this.pService = passServ
			this.scope.pageNumbers = [];
			this.scope.dipendenteList = [];
			this.scope.currentPage = 0;
			this.scope.currentPage_P = 0;
			this.howMany = 15

			this.showPage(0);
			this.scope.popupVia = {};
			this.scope.popupPas = {};

			Microsoft.Maps.loadModule("Microsoft.Maps.Search");


			this.initControlli();
			this.initBindMetodi();
			this.initMappa();

			//this.initControlli_P()
			this.initBindMetodi_P();
		}

		//#region Gestione Viaggio

		//#region Inizializzazione

		private initControlli() {
			this.service.getDipendentiFilter(2,(data) => {
				this.scope.dipendenteList = data["Dati"];
			});

			this.service.getStato((data) => {
				this.scope.statoList = data["Dati"];
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

			this.scope.openManagePasseggeri = () => this.openManagePasseggeri();
			this.scope.closeManagePasseggeri = () => this.closeManagePasseggeri();
		}

		private initMappa() {
			this.mapObj = new Microsoft.Maps.Map($("#mappaBing")[0], { credentials: "AvCv3p-UgCnQsBKohLfG71_6FT84OovVPBups8s28O5U6fEEXj9BSMFU3NX1Ee5N" });

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
			if (this.scope.popupVia.obj.IDViaggio) {
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

			} else {
				this.mapOptions.center = new Microsoft.Maps.Location(0, 0);
				this.pushPin.setLocation(new Microsoft.Maps.Location(0, 0));
				this.mapOptions.zoom = 6;

			}

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

			dlg.open()
		}

		private editViaggio(viaObj) {
			var dlg = $("#dialog").data('dialog');
			this.scope.popupVia.type = "Modifica";

			this.scope.popupVia.obj = {};
			angular.copy(viaObj, this.scope.popupVia.obj)
			this.scope.popupVia.obj.FKIDDipendente = this.scope.popupVia.obj.FKIDDipendente.toString();
			this.scope.popupVia.obj.FKIDStato = this.scope.popupVia.obj.FKIDStato.toString();
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
									content: 'Viaggio modificato con successo!',
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
								content: 'Si è verificato un errore durante la modifica del viaggio',
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
									content: 'Viaggio creato con successo!',
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
								content: 'Si è verificato un errore durante la creazione del viaggio',
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
			if (confirm("Sei sicuro di voler eliminare questo viaggio?")) {
				this.service.deleteViaggio(idVia,(result) => {
					if (result) {
						(<any>$).Notify({
							caption: 'Eliminazione',
							content: 'Viaggio eliminato con successo!',
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
							content: 'Si è verificato un errore durante l\'eliminazione del viaggio',
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

		//#region finestra passeggeri

		private openManagePasseggeri() {
			this.initControlli_P();
			this.initMappa_P();
			this.showPage_P(0);
			var dlg = $("#mgrPasseggeri").data('dialog');
			dlg.open();
		}

		private closeManagePasseggeri() {
			//this.initMappa();
			var dlg = $("#mgrPasseggeri").data('dialog');
			dlg.close();
		}

		//#endregion

		//#endregion

		//#region Gestione Passeggeri

		//#region Inizializzazione

		private initControlli_P() {
			//this.service.getDipendentiFilter(2,(data) => {
			//	this.scope.dipendenteList = data["Dati"];
			//});
			this.pService.getAnagrafiche((data) => {
				this.scope.anagraficaList = data["Dati"];
			});
		}

		private initBindMetodi_P() {
			this.scope.newPasseggero = () => this.newPasseggero();
			this.scope.editPasseggero = (pasObj) => this.editPasseggero(pasObj);
			this.scope.okEdit_P = (form) => this.okEdit_P(form);
			this.scope.cancelEdit_P = () => this.cancelEdit_P();
			this.scope.removePasseggero = (idPas) => this.removePasseggero(idPas);
			this.scope.showPage_P = (numPagina) => this.showPage_P(numPagina);
			this.scope.showMapDiv_P = (whichAddr) => this.showTabMappa_P(whichAddr)
			this.scope.centerBingMap_P = () => this.getLocationFromAddress_P(this.scope.popupPas.TmpIndirizzo);
			this.scope.okMapPosition_P = () => this.okMapPosition_P();
			this.scope.cancelMapPosition_P = () => this.cancelMapPosition_P();
		}

		private initMappa_P() {
			this.mapObj_P = new Microsoft.Maps.Map($("#mappaBing_P")[0], { credentials: "AvCv3p-UgCnQsBKohLfG71_6FT84OovVPBups8s28O5U6fEEXj9BSMFU3NX1Ee5N" });
			this.mapOptions_P = {};
			this.mapOptions_P.center = new Microsoft.Maps.Location(0, 0);
			this.mapOptions_P.zoom = 6;
			this.mapOptions_P.mapTypeId = 'a';
			this.mapObj_P.setView(this.mapOptions_P);
			this.pushPin_P = new Microsoft.Maps.Pushpin(this.mapOptions_P.center, {
				draggable: true,
			});
			this.mapObj_P.entities.insert(this.pushPin_P, 0);
		}

		//#endregion

		//#region Gestione Tab mappa

		private getLocationFromAddress_P(address: string) {
			var grOpts: Microsoft.Maps.Search.GeocodeRequestOptions;
			grOpts = {
				where: address,
				callback: (result, userData) => {
					if (result.results.length > 0) {
						this.scope.$apply(() => {
							this.mapOptions_P.center = result.results[0].location;
							this.mapOptions_P.zoom = 13;
							this.mapObj_P.setView(this.mapOptions_P);
							this.pushPin_P.setLocation(result.results[0].location);
						});
					} else (<any>$).Notify({
						caption: 'Posizione',
						content: 'L\'indirizzo richiesto non è stato trovato.',
						type: 'warning'
					})
				}
			}

			var sm = new Microsoft.Maps.Search.SearchManager
				(this.mapObj_P);

			sm.geocode(grOpts);
		}

		private showTabMappa_P(whichAddr: string) {
			this.scope.isMapShowing_P = true;
			if (whichAddr == "part") {
				this.scope.popupPas.TmpIndirizzo = this.scope.popupPas.obj.IndirizzoSalita;
				this.mapOptions_P.center = new Microsoft.Maps.Location(this.scope.popupPas.obj.LatitudineSalitaPrevista, this.scope.popupPas.obj.LongitudineSalitaPrevista);
				this.pushPin_P.setLocation(new Microsoft.Maps.Location(this.scope.popupPas.obj.LatitudineSalitaPrevista, this.scope.popupPas.obj.LongitudineSalitaPrevista));
			} else {
				this.scope.popupPas.TmpIndirizzo = this.scope.popupPas.obj.IndirizzoDiscesa;
				this.mapOptions_P.center = new Microsoft.Maps.Location(this.scope.popupPas.obj.LatitudineDiscesaPrevista, this.scope.popupPas.obj.LongitudineDiscesaPrevista);
				this.pushPin_P.setLocation(new Microsoft.Maps.Location(this.scope.popupPas.obj.LatitudineDiscesaPrevista, this.scope.popupPas.obj.LongitudineDiscesaPrevista));
			}

			this.mapOptions_P.zoom = 13;
			this.mapObj_P.setView(this.mapOptions_P);
			this.cheMappa = whichAddr;
		}

		private okMapPosition_P() {
			var currentPos = this.pushPin_P.getLocation();
			if (this.cheMappa == "part") {
				this.scope.popupPas.obj.LatitudineSalitaPrevista = currentPos.latitude;
				this.scope.popupPas.obj.LongitudineSalitaPrevista = currentPos.longitude;
				this.scope.popupPas.obj.IndirizzoSalita = this.scope.popupPas.TmpIndirizzo;
			} else {
				this.scope.popupPas.obj.LatitudineDiscesaPrevista = currentPos.latitude;
				this.scope.popupPas.obj.LongitudineDiscesaPrevista = currentPos.longitude;
				this.scope.popupPas.obj.IndirizzoDiscesa = this.scope.popupPas.TmpIndirizzo;
			}
			this.cancelMapPosition_P();
		}

		private cancelMapPosition_P() {
			this.scope.isMapShowing_P = false;
		}

		//#endregion

		//#region Paginazione

		private makeRange_P() {
			var lista = [];
			var limit: number = Math.ceil(this.totalItems_P / this.howMany);
			for (var idx = 0; idx < limit; idx++) {
				lista.push(idx)
			}
			return lista;
		}

		private showPage_P(pageToNavigate: number) {
			console.log(this.scope.popupVia.obj);
			this.scope.currentPage_P = pageToNavigate;
			this.pService.getPasseggeri(this.scope.currentPage_P, this.howMany, this.scope.popupVia.obj.IDViaggio,(data) => {
				this.scope.passeggeriList = data["Dati"];
				this.totalItems_P = data["Totale"]
				this.scope.pageNumbers_P = this.makeRange();

			});
		}

		//#endregion

		//#region Aggiunta, modifica ed eliminazione

		private newPasseggero() {
			var dlg = $("#dialogPasseggero").data('dialog');

			this.scope.popupPas.type = "Aggiungi";
			this.scope.popupPas.obj = {};
			this.scope.popupPas.obj.IDSpostamento = 0;
			this.scope.popupPas.obj.FKIDViaggio = this.scope.popupVia.obj.IDViaggio;
			this.scope.popupPas.obj.IndirizzoSalita = this.scope.popupVia.obj.IndirizzoPartenza;
			this.scope.popupPas.obj.IndirizzoDiscesa = this.scope.popupVia.obj.IndirizzoArrivo;
			this.scope.popupPas.obj.LatitudineSalitaPrevista = this.scope.popupVia.obj.LatitudinePartenzaPrevista;
			this.scope.popupPas.obj.LongitudineSalitaPrevista = this.scope.popupVia.obj.LongitudinePartenzaPrevista;
			this.scope.popupPas.obj.LatitudineDiscesaPrevista = this.scope.popupVia.obj.LatitudineArrivoPrevista;
			this.scope.popupPas.obj.LongitudineDiscesaPrevista = this.scope.popupVia.obj.LongitudineArrivoPrevista;
			this.scope.popupPas.obj.DataSalitaPrevista = this.scope.popupVia.obj.DataInizioPrevista;
			this.scope.popupPas.obj.DataDiscesaPrevista = this.scope.popupVia.obj.DataFinePrevista;

			dlg.open()
		}

		private editPasseggero(pasObj) {

			console.log("quebab")
			var dlg = $("#dialogPasseggero").data('dialog');
			this.scope.popupPas.type = "Modifica";

			this.scope.popupPas.obj = {};
			angular.copy(pasObj, this.scope.popupPas.obj)
			this.scope.popupPas.obj.FKIDStato = this.scope.popupPas.obj.FKIDStato.toString();


			dlg.open()

		}

		private okEdit_P(form: angular.IFormController) {
			console.log(form.$error);
			if (form.$valid) {

				var DataInizio: Date = new Date($("#newDate_P").val());
				var DataFine: Date = new Date($("#newDate_P").val());

				DataInizio.setHours($("#oraStr_P").val().split(':')[0]);
				DataInizio.setMinutes($("#oraStr_P").val().split(':')[1]);

				DataFine.setHours($("#oraFin_P").val().split(':')[0]);
				DataFine.setMinutes($("#oraFin_P").val().split(':')[1]);


				this.scope.popupPas.obj.DataSalitaPrevista = DataInizio;
				this.scope.popupPas.obj.DataDiscesaPrevista = DataFine;

				if (this.scope.popupPas.type == "Modifica") {
					this.pService.editPasseggero(this.scope.popupPas.obj,
						(result) => {
							if (result) {
								(<any>$).Notify({
									caption: 'Modifica',
									content: 'Viaggio modificata con successo!',
									type: 'success'
								})
								this.pService.getPasseggeri(this.scope.popupVia.obj.IDViaggio, this.scope.currentPage, this.howMany,(data) => {
									this.$scope.passeggeriList = data["Dati"];
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
							this.pService.getPasseggeri(this.scope.popupVia.obj.IDViaggio, this.scope.currentPage, this.howMany,(data) => {
								this.$scope.passeggeriList = data["Dati"];
							});
						});
				} else {
					this.pService.createPasseggero(this.scope.popupPas.obj,
						(result) => {
							if (result) {
								(<any>$).Notify({
									caption: 'Modifica',
									content: 'Viaggio creata con successo!',
									type: 'success'
								})
								this.pService.getPasseggeri(this.scope.popupVia.obj.IDViaggio, this.scope.currentPage, this.howMany,(data) => {
									this.$scope.passeggeriList = data["Dati"];
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
							this.pService.getPasseggeri(this.scope.popupVia.obj.IDViaggio, this.scope.currentPage, this.howMany,(data) => {
								this.$scope.passeggeriList = data["Dati"];
							});
						});
				}
			}
		}

		private cancelEdit_P() {
			var dlg = $('#dialogPasseggero').data('dialog');
			dlg.close();
		}

		private removePasseggero(idVia) {
			if (confirm("Sei sicuro di voler eliminare questa viaggio?")) {
				this.service.deleteViaggio(idVia,(result) => {
					if (result) {
						(<any>$).Notify({
							caption: 'Eliminazione',
							content: 'Viaggio eliminata con successo!',
							type: 'success'
						})
						this.pService.getPasseggeri(this.scope.popupVia.obj.IDViaggio, this.scope.currentPage, this.howMany,(data) => {
							this.$scope.passeggeriList = data["Dati"];
						});
					}
				},
					() => {
						(<any>$).Notify({
							caption: 'Eliminazione',
							content: 'Si è verificato un errore durante l\'eliminazione dell\'viaggio',
							type: 'alert'
						})
					});
			}
		}

		//#endregion


		//#endregion
	}
}