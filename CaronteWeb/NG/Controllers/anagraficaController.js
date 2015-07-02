var Caronte;
(function (Caronte) {
    var anagraficaController = (function () {
        function anagraficaController($scope, persServ) {
            var _this = this;
            this.$scope = $scope;
            this.scope = $scope;
            this.service = persServ;
            this.scope.pageNumbers = [];
            this.scope.currentPage = 0;
            this.howMany = 15;
            this.showPage(0);
            this.scope.popupAna = {};
            this.scope.newAnagrafica = function () { return _this.newAnagrafica(); };
            this.scope.editAnagrafica = function (anaObj) { return _this.editAnagrafica(anaObj); };
            this.scope.okEdit = function () { return _this.okEdit(); };
            this.scope.cancelEdit = function () { return _this.cancelEdit(); };
            this.scope.removeAnagrafica = function (idAna) { return _this.removeAnagrafica(idAna); };
            this.scope.showPage = function (numPagina) { return _this.showPage(numPagina); };
        }
        anagraficaController.prototype.makeRange = function () {
            var lista = [];
            var limit = Math.ceil(this.totalItems / this.howMany);
            for (var idx = 0; idx < limit; idx++) {
                lista.push(idx);
            }
            console.log(lista);
            return lista;
        };
        anagraficaController.prototype.removeAnagrafica = function (idAna) {
            var _this = this;
            if (confirm("Sei sicuro di voler eliminare questa anagrafica?")) {
                this.service.deleteAnagrafica(idAna, function (result) {
                    if (result) {
                        $.Notify({
                            caption: 'Eliminazione',
                            content: 'Anagrafica eliminata con successo!',
                            type: 'success'
                        });
                        _this.service.getAnagrafiche(_this.scope.currentPage, _this.howMany, function (data) {
                            _this.scope.anagraficaList = data["Dati"];
                            _this.totalItems = data["Totale"];
                            _this.scope.pageNumbers = _this.makeRange();
                        });
                    }
                }, function () {
                    $.Notify({
                        caption: 'Eliminazione',
                        content: 'Si è verificato un errore durante l\'eliminazione dell\'anagrafica',
                        type: 'alert'
                    });
                    _this.service.getAnagrafiche(_this.scope.currentPage, _this.howMany, function (data) {
                        _this.$scope.anagraficaList = data["Dati"];
                        _this.totalItems = data["Totale"];
                        _this.scope.pageNumbers = _this.makeRange();
                    });
                });
            }
        };
        anagraficaController.prototype.showPage = function (pageToNavigate) {
            var _this = this;
            console.log(pageToNavigate);
            this.scope.currentPage = pageToNavigate;
            this.service.getAnagrafiche(this.scope.currentPage, this.howMany, function (data) {
                _this.scope.anagraficaList = data["Dati"];
                _this.totalItems = data["Totale"];
                _this.scope.pageNumbers = _this.makeRange();
            });
        };
        anagraficaController.prototype.newAnagrafica = function () {
            var dlg = $("#dialog").data('dialog');
            this.scope.popupAna.type = "Aggiungi";
            this.scope.popupAna.obj = {};
            this.scope.popupAna.obj.Latitude = 44.22;
            this.scope.popupAna.obj.Longitude = 11.6;
            dlg.open();
        };
        anagraficaController.prototype.editAnagrafica = function (anaObj) {
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
            dlg.open();
        };
        anagraficaController.prototype.okEdit = function () {
            var _this = this;
            this.scope.popupAna.obj.DataNascita = $("#newDate").val();
            console.log(this.scope.popupAna.obj);
            if (this.scope.popupAna.type == "Modifica") {
                this.service.editAnagrafica(this.scope.popupAna.obj, function (result) {
                    if (result) {
                        $.Notify({
                            caption: 'Modifica',
                            content: 'Anagrafica modificata con successo!',
                            type: 'success'
                        });
                        _this.service.getAnagrafiche(_this.scope.currentPage, _this.howMany, function (data) {
                            _this.$scope.anagraficaList = data["Dati"];
                        });
                        _this.cancelEdit();
                    }
                }, function () {
                    $.Notify({
                        caption: 'Modifica',
                        content: 'Si è verificato un errore durante la modifica dell\'anagrafica',
                        type: 'alert'
                    });
                    _this.service.getAnagrafiche(_this.scope.currentPage, _this.howMany, function (data) {
                        _this.$scope.anagraficaList = data["Dati"];
                    });
                });
            }
            else {
                this.service.createAnagrafica(this.scope.popupAna.obj, function (result) {
                    if (result) {
                        $.Notify({
                            caption: 'Modifica',
                            content: 'Anagrafica creata con successo!',
                            type: 'success'
                        });
                        _this.service.getAnagrafiche(_this.scope.currentPage, _this.howMany, function (data) {
                            _this.$scope.anagraficaList = data["Dati"];
                        });
                        _this.cancelEdit();
                    }
                }, function () {
                    $.Notify({
                        caption: 'Modifica',
                        content: 'Si è verificato un errore durante la creazione dell\'anagrafica',
                        type: 'alert'
                    });
                    _this.service.getAnagrafiche(_this.scope.currentPage, _this.howMany, function (data) {
                        _this.$scope.anagraficaList = data["Dati"];
                    });
                });
            }
        };
        anagraficaController.prototype.cancelEdit = function () {
            var dlg = $('#dialog').data('dialog');
            dlg.close();
        };
        anagraficaController.$inject = ["$scope", "anagraficaService"];
        return anagraficaController;
    })();
    Caronte.anagraficaController = anagraficaController;
})(Caronte || (Caronte = {}));
//# sourceMappingURL=anagraficaController.js.map