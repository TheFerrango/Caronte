module Caronte {
	interface IAppCtrlScope extends ng.IScope {
		coops: any;
		config: any;
		popupAna: any;
		editAnagrafica: Function;
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
			this.scope.cancelEdit = () => this.cancelEdit();
			this.scope.removeAnagrafica = (idAna) => this.removeAnagrafica(idAna);
		}

		private removeAnagrafica(idAna) {
			if (confirm("Sei sicuro di voler eliminare questa anagrafica?")) {
				this.service.deleteAnagrafica(idAna,(result) => {
					console.log(result);
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
			this.scope.popupAna.obj = anaObj;

			dlg.open()

		}

		private cancelEdit() {
			var dlg = $('#dialog').data('dialog');
			dlg.close();
		}
	}
}