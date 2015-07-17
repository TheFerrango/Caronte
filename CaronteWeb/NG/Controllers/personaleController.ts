﻿module Caronte {
	interface IAppCtrlScope extends ng.IScope {
		currentPage: number;
		pageNumbers: number[];

		anagraficaList: any;
		personaleList: any;
		ruoloList: any;
		popupPer: any;

		refreshAnagrafiche: Function;
		newPersonale: Function;
		editPersonale: Function;
		okEdit: Function;
		cancelEdit: Function;
		removePersonale: Function;
		showPage: Function;


		submittami: Function;

	}

	export class personaleController {
		static $inject = ["$scope", "personaleService"];
		scope: IAppCtrlScope;
		service:  personaleService;
		totalItems: number;
		howMany: number;

		constructor(private $scope: IAppCtrlScope, persServ: personaleService) {

			this.scope = $scope;
			this.service = persServ;
			this.scope.pageNumbers = [];
			this.scope.currentPage = 0;
			this.howMany = 15
			this.showPage(0);
			this.scope.popupPer = {};

			this.initControlli();
			this.initBindMetodi();
		}

		//#region Inizializzazione

		private initControlli() {
			console.log("ana")
			this.service.getAnagraficheFilter(this.scope.popupPer.selectedName,(data) => {
				this.$scope.anagraficaList = data["Dati"];
			});

			this.service.getRuolo((data) => {
				this.$scope.ruoloList = data["Dati"];
			});
			
		}

		private initBindMetodi() {
			this.scope.newPersonale = () => this.newPersonale();
			this.scope.editPersonale = (anaObj) => this.editPersonale(anaObj);
			this.scope.okEdit = (form) => this.okEdit(form);
			this.scope.cancelEdit = () => this.cancelEdit();
			this.scope.removePersonale = (idAna) => this.removePersonale(idAna);
			this.scope.showPage = (numPagina) => this.showPage(numPagina);
			this.scope.refreshAnagrafiche = () => this.refreshAnagrafiche();
		}		

		//#endregion

		private refreshAnagrafiche() {
			if (this.scope.popupPer.selectedName && (this.scope.popupPer.selectedName.length > 4 || this.scope.popupPer.selectedName.length == 0))
				this.service.getAnagraficheFilter(this.scope.popupPer.selectedName,(data) => {
					this.$scope.anagraficaList = data["Dati"];
				});
		}

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
			this.service.getPersonale(this.scope.currentPage, this.howMany,(data) => {
				this.scope.personaleList = data["Dati"];
				this.totalItems = data["Totale"]
				this.scope.pageNumbers = this.makeRange();
			});
		}

		//#endregion

		//#region Aggiunta, modifica ed eliminazione

		private newPersonale() {
			var dlg = $("#dialog").data('dialog');
			this.scope.popupPer.type = "Aggiungi";
			this.scope.popupPer.obj = {};
			this.scope.popupPer.obj.IDDipendente = 0;
			this.scope.popupPer.obj.FKIDAnagrafica = null;
			this.scope.popupPer.obj.FKIDRuolo = null;
			this.scope.popupPer.obj.DipendenteDal = new Date();
			this.scope.popupPer.obj.Attivo = true;

			dlg.open()
		}

		private editPersonale(perObj) {
			var dlg = $("#dialog").data('dialog');
			this.scope.popupPer.type = "Modifica";
			this.scope.popupPer.obj = {};
			this.scope.popupPer.obj.IDDipendente = perObj.IDDipendente;
			this.scope.popupPer.obj.FKIDAnagrafica = perObj.FKIDAnagrafica.toString();
			this.scope.popupPer.obj.FKIDRuolo = perObj.FKIDRuolo.toString();
			this.scope.popupPer.obj.Password = perObj.Password;
			this.scope.popupPer.obj.DipendenteDal = perObj.DipendenteDal;
			this.scope.popupPer.obj.DipendenteAl = perObj.DipendenteAl;
			this.scope.popupPer.obj.Attivo = perObj.Attivo;

			this.scope.popupPer.obj.NOMINATIVO = perObj.NOMINATIVO;
			this.scope.popupPer.obj.RUOLO_DESC = perObj.RUOLO_DESC;
			console.log(this.scope.popupPer.obj);

			dlg.open()

		}

		private okEdit(form: angular.IFormController) {
			console.log(form.$error);
			if (form.$valid) {
				this.scope.popupPer.obj.DipendenteDal = $("#newDateDal").val();
				this.scope.popupPer.obj.DipendenteAl = $("#newDateAl").val();
				

				if (this.scope.popupPer.type == "Modifica") {
					this.service.editPersonale(this.scope.popupPer.obj,
						(result) => {
							if (result) {
								(<any>$).Notify({
									caption: 'Modifica',
									content: 'Personale modificata con successo!',
									type: 'success'
								})
								this.service.getPersonale(this.scope.currentPage, this.howMany,(data) => {
									this.$scope.personaleList = data["Dati"];
								});
								this.cancelEdit();
							}
						},
						() => {
							(<any>$).Notify({
								caption: 'Modifica',
								content: 'Si è verificato un errore durante la modifica dell\'personale',
								type: 'alert'
							})
							this.service.getPersonale(this.scope.currentPage, this.howMany,(data) => {
								this.$scope.personaleList = data["Dati"];
							});
						});
				} else {
					this.service.createPersonale(this.scope.popupPer.obj,
						(result) => {
							if (result) {
								(<any>$).Notify({
									caption: 'Creazione',
									content: 'Personale creata con successo!',
									type: 'success'
								})
								this.service.getPersonale(this.scope.currentPage, this.howMany,(data) => {
									this.$scope.personaleList = data["Dati"];
								});
								this.cancelEdit();
							}
						},
						() => {
							(<any>$).Notify({
								caption: 'Creazione',
								content: 'Si è verificato un errore durante la creazione dell\'personale',
								type: 'alert'
							})
							this.service.getPersonale(this.scope.currentPage, this.howMany,(data) => {
								this.$scope.personaleList = data["Dati"];
							});
						});
				}
			}
		}

		private cancelEdit() {
			var dlg = $('#dialog').data('dialog');
			dlg.close();
		}

		private removePersonale(idAna) {
			if (confirm("Sei sicuro di voler eliminare questa personale?")) {
				this.service.deletePersonale(idAna,(result) => {
					if (result) {
						(<any>$).Notify({
							caption: 'Eliminazione',
							content: 'Personale eliminata con successo!',
							type: 'success'
						})
						this.service.getPersonale(this.scope.currentPage, this.howMany,(data) => {
							this.scope.personaleList = data["Dati"];
							this.totalItems = data["Totale"]
							this.scope.pageNumbers = this.makeRange();
						});
					}
				},
					() => {
						(<any>$).Notify({
							caption: 'Eliminazione',
							content: 'Si è verificato un errore durante l\'eliminazione dell\'personale',
							type: 'alert'
						})
						this.service.getPersonale(this.scope.currentPage, this.howMany,(data) => {
							this.$scope.personaleList = data["Dati"];
							this.totalItems = data["Totale"]
							this.scope.pageNumbers = this.makeRange();
						});
					});
			}
		}

		//#endregion
	}


}