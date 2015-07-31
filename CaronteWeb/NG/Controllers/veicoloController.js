var Caronte;
(function (Caronte) {
    var veicoloController = (function () {
        function veicoloController($scope, persServ) {
            this.$scope = $scope;
            this.scope = $scope;
            this.service = persServ;
            this.scope.pageNumbers = [];
            this.scope.currentPage = 0;
            this.howMany = 15;
            this.showPage(0);
            this.scope.popupVei = {};
            this.scope.SetArrowVisibility(true);
            this.scope.SetTitle("Gestione Veicoli");
            this.initBindMetodi();
        }
        //#region Inizializzazione
        veicoloController.prototype.initBindMetodi = function () {
            var _this = this;
            this.scope.newVeicolo = function () { return _this.newVeicolo(); };
            this.scope.editVeicolo = function (anaObj) { return _this.editVeicolo(anaObj); };
            this.scope.okEdit = function (form) { return _this.okEdit(form); };
            this.scope.cancelEdit = function () { return _this.cancelEdit(); };
            this.scope.removeVeicolo = function (idAna) { return _this.removeVeicolo(idAna); };
            this.scope.showPage = function (numPagina) { return _this.showPage(numPagina); };
        };
        //#endregion
        //#region Paginazione
        veicoloController.prototype.makeRange = function () {
            var lista = [];
            var limit = Math.ceil(this.totalItems / this.howMany);
            for (var idx = 0; idx < limit; idx++) {
                lista.push(idx);
            }
            return lista;
        };
        veicoloController.prototype.showPage = function (pageToNavigate) {
            var _this = this;
            console.log(pageToNavigate);
            this.scope.currentPage = pageToNavigate;
            this.service.getVeicoli(this.scope.currentPage, this.howMany, function (data) {
                _this.scope.veicoloList = data["Dati"];
                _this.totalItems = data["Totale"];
                _this.scope.pageNumbers = _this.makeRange();
            });
        };
        //#endregion
        //#region Aggiunta, modifica ed eliminazione
        veicoloController.prototype.newVeicolo = function () {
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
            dlg.open();
        };
        veicoloController.prototype.editVeicolo = function (perObj) {
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
            dlg.open();
        };
        veicoloController.prototype.okEdit = function (form) {
            var _this = this;
            console.log(form.$error);
            if (form.$valid) {
                this.scope.popupVei.obj.DataAcquisto = $("#dataAcq").val();
                this.scope.popupVei.obj.DataVendita = $("#dataVen").val();
                if (this.scope.popupVei.type == "Modifica") {
                    this.service.editVeicolo(this.scope.popupVei.obj, function (result) {
                        if (result) {
                            $.Notify({
                                caption: 'Modifica',
                                content: 'Veicolo modificato con successo!',
                                type: 'success'
                            });
                            _this.service.getVeicoli(_this.scope.currentPage, _this.howMany, function (data) {
                                _this.$scope.veicoloList = data["Dati"];
                            });
                            _this.cancelEdit();
                        }
                    }, function () {
                        $.Notify({
                            caption: 'Modifica',
                            content: 'Si è verificato un errore durante la modifica del veicolo',
                            type: 'alert'
                        });
                        _this.service.getVeicoli(_this.scope.currentPage, _this.howMany, function (data) {
                            _this.$scope.veicoloList = data["Dati"];
                        });
                    });
                }
                else {
                    this.service.createVeicolo(this.scope.popupVei.obj, function (result) {
                        if (result) {
                            $.Notify({
                                caption: 'Creazione',
                                content: 'Veicolo creato con successo!',
                                type: 'success'
                            });
                            _this.service.getVeicoli(_this.scope.currentPage, _this.howMany, function (data) {
                                _this.$scope.veicoloList = data["Dati"];
                            });
                            _this.cancelEdit();
                        }
                    }, function () {
                        $.Notify({
                            caption: 'Creazione',
                            content: 'Si è verificato un errore durante la creazione del veicolo',
                            type: 'alert'
                        });
                        _this.service.getVeicoli(_this.scope.currentPage, _this.howMany, function (data) {
                            _this.$scope.veicoloList = data["Dati"];
                        });
                    });
                }
            }
        };
        veicoloController.prototype.cancelEdit = function () {
            var dlg = $('#dialog').data('dialog');
            dlg.close();
        };
        veicoloController.prototype.removeVeicolo = function (idAna) {
            var _this = this;
            if (confirm("Sei sicuro di voler eliminare questo veicolo?")) {
                this.service.deleteVeicolo(idAna, function (result) {
                    if (result) {
                        $.Notify({
                            caption: 'Eliminazione',
                            content: 'Veicolo eliminato con successo!',
                            type: 'success'
                        });
                        _this.service.getVeicoli(_this.scope.currentPage, _this.howMany, function (data) {
                            _this.scope.veicoloList = data["Dati"];
                            _this.totalItems = data["Totale"];
                            _this.scope.pageNumbers = _this.makeRange();
                        });
                    }
                }, function () {
                    $.Notify({
                        caption: 'Eliminazione',
                        content: 'Si è verificato un errore durante l\'eliminazione del veicolo',
                        type: 'alert'
                    });
                    _this.service.getVeicoli(_this.scope.currentPage, _this.howMany, function (data) {
                        _this.$scope.veicoloList = data["Dati"];
                        _this.totalItems = data["Totale"];
                        _this.scope.pageNumbers = _this.makeRange();
                    });
                });
            }
        };
        veicoloController.$inject = ["$scope", "veicoloService"];
        return veicoloController;
    })();
    Caronte.veicoloController = veicoloController;
})(Caronte || (Caronte = {}));
//# sourceMappingURL=veicoloController.js.map