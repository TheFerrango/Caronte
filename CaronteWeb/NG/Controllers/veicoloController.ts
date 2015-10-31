module Caronte {
	interface IAppCtrlScope extends Caronte.ICaronteBaseScope {
		currentPage: number;
		pageNumbers: number[];
				
		veicoloList: any;
		popupVei: any;

		newVeicolo: Function;
		editVeicolo: Function;
		okEdit: Function;
		cancelEdit: Function;
		removeVeicolo: Function;
		showPage: Function;

		submittami: Function;
	}

	export class veicoloController {
		static $inject = ["$scope", "veicoloService"];
		scope: IAppCtrlScope;
		service: veicoloService;
		totalItems: number;
		howMany: number;

		constructor(private $scope: IAppCtrlScope, persServ: veicoloService) {			
			this.scope = $scope;
			this.service = persServ;
			this.scope.pageNumbers = [];
			this.scope.currentPage = 0;
			this.howMany = 15
			this.showPage(0);
			this.scope.popupVei = {};
			this.scope.SetArrowVisibility(true);
			this.scope.SetTitle("Gestione Veicoli");
		
			this.initBindMetodi();
		}

		//#region Inizializzazione
			

		private initBindMetodi() {
			this.scope.newVeicolo = () => this.newVeicolo();
			this.scope.editVeicolo = (anaObj) => this.editVeicolo(anaObj);
			this.scope.okEdit = (form) => this.okEdit(form);
			this.scope.cancelEdit = () => this.cancelEdit();
			this.scope.removeVeicolo = (idAna) => this.removeVeicolo(idAna);
			this.scope.showPage = (numPagina) => this.showPage(numPagina);		
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
			this.service.getVeicoli(this.scope.currentPage, this.howMany,(data) => {
				this.scope.veicoloList = data["Dati"];
				this.totalItems = data["Totale"]
				this.scope.pageNumbers = this.makeRange();
			});
		}

		//#endregion

		//#region Aggiunta, modifica ed eliminazione

		private newVeicolo() {
			var dlg = $("#dialog").data('dialog');
			this.scope.popupVei.type = "Aggiungi";

			this.scope.popupVei.obj = {};
			this.scope.popupVei.obj.IDVeicolo = 0;
			this.scope.popupVei.obj.Targa = null;
			this.scope.popupVei.obj.Modello = null;
			this.scope.popupVei.obj.Cilindrata = null;
			this.scope.popupVei.obj.AnnoProduzione = null;
			this.scope.popupVei.obj.DataAcquisto = null;
			this.scope.popupVei.obj.DataVendita = null;

			dlg.open()
		}

		private editVeicolo(perObj) {
			var dlg = $("#dialog").data('dialog');
			this.scope.popupVei.type = "Modifica";
			this.scope.popupVei.obj = {};
			this.scope.popupVei.obj.IDVeicolo = perObj.IDVeicolo;
			this.scope.popupVei.obj.Targa = perObj.Targa;
			this.scope.popupVei.obj.Modello = perObj.Modello;
			this.scope.popupVei.obj.Cilindrata = perObj.Cilindrata;
			this.scope.popupVei.obj.AnnoProduzione = perObj.AnnoProduzione;
			this.scope.popupVei.obj.DataAcquisto = perObj.DataAcquisto;
			this.scope.popupVei.obj.DataVendita = perObj.DataVendita;
			console.log(this.scope.popupVei.obj);

			dlg.open()

		}

		private okEdit(form: angular.IFormController) {
			console.log(form.$error);
			if (form.$valid) {
				this.scope.popupVei.obj.DataAcquisto = $("#dataAcq").val();
				this.scope.popupVei.obj.DataVendita = $("#dataVen").val();


				if (this.scope.popupVei.type == "Modifica") {
					this.service.editVeicolo(this.scope.popupVei.obj,
						(result) => {
							if (result) {
								(<any>$).Notify({
									caption: 'Modifica',
									content: 'Veicolo modificato con successo!',
                                    icon: "<span class='mif-earth'></span>",
                                    type: 'success'
								})
								this.service.getVeicoli(this.scope.currentPage, this.howMany,(data) => {
									this.$scope.veicoloList = data["Dati"];
								});
								this.cancelEdit();
							}
						},
						() => {
							(<any>$).Notify({
								caption: 'Modifica',
								content: 'Si è verificato un errore durante la modifica del veicolo',
								icon: "<span class='mif-cross'></span>",type: 'alert'
							})
							this.service.getVeicoli(this.scope.currentPage, this.howMany,(data) => {
								this.$scope.veicoloList = data["Dati"];
							});
						});
				} else {
					this.service.createVeicolo(this.scope.popupVei.obj,
						(result) => {
							if (result) {
								(<any>$).Notify({
									caption: 'Creazione',
									content: 'Veicolo creato con successo!',
                                    icon: "<span class='mif-earth'></span>",
                                    type: 'success'
								})
								this.service.getVeicoli(this.scope.currentPage, this.howMany,(data) => {
									this.$scope.veicoloList = data["Dati"];
								});
								this.cancelEdit();
							}
						},
						() => {
							(<any>$).Notify({
								caption: 'Creazione',
								content: 'Si è verificato un errore durante la creazione del veicolo',
                                icon: "<span class='mif-cross'></span>",
                                type: 'alert'
							})
							this.service.getVeicoli(this.scope.currentPage, this.howMany,(data) => {
								this.$scope.veicoloList = data["Dati"];
							});
						});
				}
			}
		}

		private cancelEdit() {
			var dlg = $('#dialog').data('dialog');
			dlg.close();
		}

		private removeVeicolo(idAna) {
			if (confirm("Sei sicuro di voler eliminare questo veicolo?")) {
				this.service.deleteVeicolo(idAna,(result) => {
					if (result) {
						(<any>$).Notify({
							caption: 'Eliminazione',
							content: 'Veicolo eliminato con successo!',
                            icon: "<span class='mif-earth'></span>",
                            type: 'success'
						})
						this.service.getVeicoli(this.scope.currentPage, this.howMany,(data) => {
							this.scope.veicoloList = data["Dati"];
							this.totalItems = data["Totale"]
							this.scope.pageNumbers = this.makeRange();
						});
					}
				},
					() => {
						(<any>$).Notify({
							caption: 'Eliminazione',
							content: 'Si è verificato un errore durante l\'eliminazione del veicolo',
                            icon: "<span class='mif-cross'></span>",
                            type: 'alert'
						})
						this.service.getVeicoli(this.scope.currentPage, this.howMany,(data) => {
							this.$scope.veicoloList = data["Dati"];
							this.totalItems = data["Totale"]
							this.scope.pageNumbers = this.makeRange();
						});
					});
			}
		}

		//#endregion
	
	}
}