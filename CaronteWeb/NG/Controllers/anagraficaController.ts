module Caronte {
	interface IAppCtrlScope extends ng.IScope {
		coops: any;
		config: any;
		popupAna: any;
		editAnagrafica: Function;
		okEdit: Function;
		cancelEdit: Function;
		removeAnagrafica: Function;
	}

	export class anagraficaController {
		static $inject = ["$scope", "anagraficaService"];
		scope: IAppCtrlScope;
		service: anagraficaService;

		constructor(private $scope: IAppCtrlScope, persServ: anagraficaService) {
			this.scope = $scope;
			this.service = persServ;

			this.service.getAnagrafiche((data) => {
				this.scope.coops = data;
			});

			this.scope.config = {
				itemsPerPage: 15,
				fillLastPage: true
			};

			this.scope.popupAna = {};

			this.scope.editAnagrafica = (anaObj) => this.editAnagrafica(anaObj);
			this.scope.okEdit = () => this.okEdit();
			this.scope.cancelEdit = () => this.cancelEdit();
			this.scope.removeAnagrafica = (idAna) => this.removeAnagrafica(idAna);
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
						this.service.getAnagrafiche((data) => {
							this.$scope.coops = data;
						});
					}
				});
			}
		}

		private editAnagrafica(anaObj) {
			var dlg = $("#dialog").data('dialog');
			this.scope.popupAna.type = "Modifica";
			console.log(anaObj)
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
			this.service.editAnagrafica(this.scope.popupAna.obj,
				(result) => {
					if (result) {
						(<any>$).Notify({
							caption: 'Modifica',
							content: 'Anagrafica modificata con successo!',
							type: 'success'
						})
						this.service.getAnagrafiche((data) => {
							this.$scope.coops = data;
						});
						this.cancelEdit();
					}
				},
				() => {
					(<any>$).Notify({
						caption: 'Modifica',
						content: 'Si è verificato un errore',
						type: 'alert'
					})
					this.service.getAnagrafiche((data) => {
						this.$scope.coops = data;
					});
				});
		}

		private cancelEdit() {
			var dlg = $('#dialog').data('dialog');
			dlg.close();
		}
	}
}