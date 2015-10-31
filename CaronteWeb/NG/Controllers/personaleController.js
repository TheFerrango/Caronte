var Caronte;
(function (Caronte) {
    var personaleController = (function () {
        function personaleController($scope, persServ) {
            this.$scope = $scope;
            this.scope = $scope;
            this.service = persServ;
            this.scope.pageNumbers = [];
            this.scope.currentPage = 0;
            this.howMany = 15;
            this.showPage(0);
            this.scope.popupPer = {};
            this.scope.SetArrowVisibility(true);
            this.scope.SetTitle("Gestione Personale");
            console.log("personale");
            this.initControlli();
            this.initBindMetodi();
        }
        //#region Inizializzazione
        personaleController.prototype.initControlli = function () {
            var _this = this;
            console.log("ana");
            this.service.getAnagraficheFilter(this.scope.popupPer.selectedName, function (data) {
                _this.$scope.anagraficaList = data["Dati"];
            });
            this.service.getRuolo(function (data) {
                _this.$scope.ruoloList = data["Dati"];
            });
        };
        personaleController.prototype.initBindMetodi = function () {
            var _this = this;
            this.scope.newPersonale = function () { return _this.newPersonale(); };
            this.scope.editPersonale = function (anaObj) { return _this.editPersonale(anaObj); };
            this.scope.okEdit = function (form) { return _this.okEdit(form); };
            this.scope.cancelEdit = function () { return _this.cancelEdit(); };
            this.scope.removePersonale = function (idAna) { return _this.removePersonale(idAna); };
            this.scope.showPage = function (numPagina) { return _this.showPage(numPagina); };
            this.scope.refreshAnagrafiche = function () { return _this.refreshAnagrafiche(); };
        };
        //#endregion
        personaleController.prototype.refreshAnagrafiche = function () {
            var _this = this;
            if (this.scope.popupPer.selectedName && (this.scope.popupPer.selectedName.length > 4 || this.scope.popupPer.selectedName.length == 0))
                this.service.getAnagraficheFilter(this.scope.popupPer.selectedName, function (data) {
                    _this.$scope.anagraficaList = data["Dati"];
                });
        };
        //#region Paginazione
        personaleController.prototype.makeRange = function () {
            var lista = [];
            var limit = Math.ceil(this.totalItems / this.howMany);
            for (var idx = 0; idx < limit; idx++) {
                lista.push(idx);
            }
            return lista;
        };
        personaleController.prototype.showPage = function (pageToNavigate) {
            var _this = this;
            console.log(pageToNavigate);
            this.scope.currentPage = pageToNavigate;
            this.service.getPersonale(this.scope.currentPage, this.howMany, function (data) {
                _this.scope.personaleList = data["Dati"];
                _this.totalItems = data["Totale"];
                _this.scope.pageNumbers = _this.makeRange();
            });
        };
        //#endregion
        //#region Aggiunta, modifica ed eliminazione
        personaleController.prototype.newPersonale = function () {
            var dlg = $("#dialog").data('dialog');
            this.scope.popupPer.type = "Aggiungi";
            this.scope.popupPer.obj = {};
            this.scope.popupPer.obj.IDDipendente = 0;
            this.scope.popupPer.obj.FKIDAnagrafica = null;
            this.scope.popupPer.obj.FKIDRuolo = null;
            this.scope.popupPer.obj.DipendenteDal = new Date();
            this.scope.popupPer.obj.Attivo = true;
            dlg.open();
        };
        personaleController.prototype.editPersonale = function (perObj) {
            var dlg = $("#dialog").data('dialog');
            this.scope.popupPer.type = "Modifica";
            this.scope.popupPer.obj = {};
            angular.copy(perObj, this.scope.popupPer.obj);
            this.scope.popupPer.obj.FKIDAnagrafica = perObj.FKIDAnagrafica.toString();
            this.scope.popupPer.obj.FKIDRuolo = perObj.FKIDRuolo.toString();
            dlg.open();
        };
        personaleController.prototype.okEdit = function (form) {
            var _this = this;
            console.log(form.$error);
            if (form.$valid) {
                this.scope.popupPer.obj.DipendenteDal = $("#newDateDal").val();
                this.scope.popupPer.obj.DipendenteAl = $("#newDateAl").val();
                if (this.scope.popupPer.type == "Modifica") {
                    this.service.editPersonale(this.scope.popupPer.obj, function (result) {
                        if (result) {
                            $.Notify({
                                caption: 'Modifica',
                                content: 'Personale modificato con successo!',
                                icon: "<span class='mif-earth'></span>",
                                type: 'success'
                            });
                            _this.service.getPersonale(_this.scope.currentPage, _this.howMany, function (data) {
                                _this.$scope.personaleList = data["Dati"];
                            });
                            _this.cancelEdit();
                        }
                    }, function () {
                        $.Notify({
                            caption: 'Modifica',
                            content: 'Si è verificato un errore durante la modifica del personale',
                            icon: "<span class='mif-cross'></span>",
                            type: 'alert'
                        });
                        _this.service.getPersonale(_this.scope.currentPage, _this.howMany, function (data) {
                            _this.$scope.personaleList = data["Dati"];
                        });
                    });
                }
                else {
                    this.service.createPersonale(this.scope.popupPer.obj, function (result) {
                        if (result) {
                            $.Notify({
                                caption: 'Creazione',
                                content: 'Personale creato con successo!',
                                icon: "<span class='mif-earth'></span>",
                                type: 'success'
                            });
                            _this.service.getPersonale(_this.scope.currentPage, _this.howMany, function (data) {
                                _this.$scope.personaleList = data["Dati"];
                            });
                            _this.cancelEdit();
                        }
                    }, function () {
                        $.Notify({
                            caption: 'Creazione',
                            content: 'Si è verificato un errore durante la creazione del personale',
                            icon: "<span class='mif-cross'></span>",
                            type: 'alert'
                        });
                        _this.service.getPersonale(_this.scope.currentPage, _this.howMany, function (data) {
                            _this.$scope.personaleList = data["Dati"];
                        });
                    });
                }
            }
        };
        personaleController.prototype.cancelEdit = function () {
            var dlg = $('#dialog').data('dialog');
            dlg.close();
        };
        personaleController.prototype.removePersonale = function (idAna) {
            var _this = this;
            if (confirm("Sei sicuro di voler eliminare questa voce del personale?")) {
                this.service.deletePersonale(idAna, function (result) {
                    if (result) {
                        $.Notify({
                            caption: 'Eliminazione',
                            content: 'Personale eliminato con successo!',
                            icon: "<span class='mif-earth'></span>",
                            type: 'success'
                        });
                        _this.service.getPersonale(_this.scope.currentPage, _this.howMany, function (data) {
                            _this.scope.personaleList = data["Dati"];
                            _this.totalItems = data["Totale"];
                            _this.scope.pageNumbers = _this.makeRange();
                        });
                    }
                }, function () {
                    $.Notify({
                        caption: 'Eliminazione',
                        content: 'Si è verificato un errore durante l\'eliminazione del personale',
                        icon: "<span class='mif-cross'></span>",
                        type: 'alert'
                    });
                    _this.service.getPersonale(_this.scope.currentPage, _this.howMany, function (data) {
                        _this.$scope.personaleList = data["Dati"];
                        _this.totalItems = data["Totale"];
                        _this.scope.pageNumbers = _this.makeRange();
                    });
                });
            }
        };
        personaleController.$inject = ["$scope", "personaleService"];
        return personaleController;
    })();
    Caronte.personaleController = personaleController;
})(Caronte || (Caronte = {}));
//# sourceMappingURL=personaleController.js.map