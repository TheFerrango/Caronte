var Caronte;
(function (Caronte) {
    var anagraficaController = (function () {
        function anagraficaController($scope, persServ) {
            var _this = this;
            this.$scope = $scope;
            this.scope = $scope;
            this.service = persServ;
            this.service.getAnagrafiche(function (data) {
                _this.scope.coops = data;
            });
            this.scope.config = {
                itemsPerPage: 15,
                fillLastPage: true
            };
            this.scope.popupAna = {};
            this.scope.editAnagrafica = function (anaObj) { return _this.editAnagrafica(anaObj); };
            this.scope.okEdit = function () { return _this.okEdit(); };
            this.scope.cancelEdit = function () { return _this.cancelEdit(); };
            this.scope.removeAnagrafica = function (idAna) { return _this.removeAnagrafica(idAna); };
        }
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
                        _this.service.getAnagrafiche(function (data) {
                            _this.$scope.coops = data;
                        });
                    }
                });
            }
        };
        anagraficaController.prototype.editAnagrafica = function (anaObj) {
            var dlg = $("#dialog").data('dialog');
            this.scope.popupAna.type = "Modifica";
            console.log(anaObj);
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
            this.service.editAnagrafica(this.scope.popupAna.obj, function (result) {
                if (result) {
                    $.Notify({
                        caption: 'Modifica',
                        content: 'Anagrafica modificata con successo!',
                        type: 'success'
                    });
                    _this.service.getAnagrafiche(function (data) {
                        _this.$scope.coops = data;
                    });
                    _this.cancelEdit();
                }
            }, function () {
                $.Notify({
                    caption: 'Modifica',
                    content: 'Si è verificato un errore',
                    type: 'alert'
                });
                _this.service.getAnagrafiche(function (data) {
                    _this.$scope.coops = data;
                });
            });
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