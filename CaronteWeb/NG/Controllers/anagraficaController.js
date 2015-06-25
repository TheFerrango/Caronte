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
            this.scope.cancelEdit = function () { return _this.cancelEdit(); };
            this.scope.removeAnagrafica = function (idAna) { return _this.removeAnagrafica(idAna); };
        }
        anagraficaController.prototype.removeAnagrafica = function (idAna) {
            var _this = this;
            if (confirm("Sei sicuro di voler eliminare questa anagrafica?")) {
                this.service.deleteAnagrafica(idAna, function (result) {
                    console.log(result);
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
            this.scope.popupAna.obj = anaObj;
            dlg.open();
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