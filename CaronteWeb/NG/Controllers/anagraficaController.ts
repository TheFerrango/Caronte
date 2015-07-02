module Caronte {
	interface IAppCtrlScope extends ng.IScope {
		currentPage: number;
		pageNumbers: number[];

		anagraficaList: any;
		popupAna: any;

		newAnagrafica: Function;
		editAnagrafica: Function;
		okEdit: Function;
		cancelEdit: Function;
		removeAnagrafica: Function;
		showPage: Function;		
	}

	export class anagraficaController {
		static $inject = ["$scope", "anagraficaService"];
		scope: IAppCtrlScope;
		service: anagraficaService;
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

			this.scope.newAnagrafica = () => this.newAnagrafica();
			this.scope.editAnagrafica = (anaObj) => this.editAnagrafica(anaObj);
			this.scope.okEdit = () => this.okEdit();
			this.scope.cancelEdit = () => this.cancelEdit();
			this.scope.removeAnagrafica = (idAna) => this.removeAnagrafica(idAna);
			this.scope.showPage = (numPagina) => this.showPage(numPagina);
		}

		private makeRange()  {
			var lista = [];
			var limit: number = Math.ceil(this.totalItems / this.howMany);
			for (var idx = 0; idx < limit; idx++) {
				lista.push(idx)
			}
			console.log(lista);
			return lista;
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

		private showPage(pageToNavigate: number) {
			console.log(pageToNavigate);
			this.scope.currentPage = pageToNavigate;
			this.service.getAnagrafiche(this.scope.currentPage, this.howMany,(data) => {
				this.scope.anagraficaList = data["Dati"];
				this.totalItems = data["Totale"]
				this.scope.pageNumbers = this.makeRange();
				
			});
		}

		private newAnagrafica() {
			var dlg = $("#dialog").data('dialog');
			this.scope.popupAna.type = "Aggiungi";

			this.scope.popupAna.obj = {};
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
			this.scope.popupAna.obj.Indirizzo = anaObj.Indirizzo;
			this.scope.popupAna.obj.Latitude = anaObj.Latitude;
			this.scope.popupAna.obj.Longitude = anaObj.Longitude;

			dlg.open()

		}

		private okEdit() {
			this.scope.popupAna.obj.DataNascita = $("#newDate").val();
			console.log(this.scope.popupAna.obj);

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

		private cancelEdit() {
			var dlg = $('#dialog').data('dialog');
			dlg.close();
		}
	}
}