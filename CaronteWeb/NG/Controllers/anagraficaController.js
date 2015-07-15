var Caronte;
(function (Caronte) {
    var anagraficaController = (function () {
        function anagraficaController($scope, persServ) {
            this.$scope = $scope;
            this.scope = $scope;
            this.service = persServ;
            this.scope.pageNumbers = [];
            this.scope.currentPage = 0;
            this.howMany = 15;
            this.showPage(0);
            this.scope.popupAna = {};
            this.initBindMetodi();
            this.initMappa();
        }
        //#region Inizializzazione
        anagraficaController.prototype.initBindMetodi = function () {
            var _this = this;
            this.scope.newAnagrafica = function () { return _this.newAnagrafica(); };
            this.scope.editAnagrafica = function (anaObj) { return _this.editAnagrafica(anaObj); };
            this.scope.okEdit = function (form) { return _this.okEdit(form); };
            this.scope.cancelEdit = function () { return _this.cancelEdit(); };
            this.scope.removeAnagrafica = function (idAna) { return _this.removeAnagrafica(idAna); };
            this.scope.showPage = function (numPagina) { return _this.showPage(numPagina); };
            this.scope.showMapDiv = function () { return _this.showTabMappa(); };
            this.scope.centerBingMap = function () { return _this.getLocationFromAddress(_this.scope.popupAna.TmpIndirizzo); };
            this.scope.okMapPosition = function () { return _this.okMapPosition(); };
            this.scope.cancelMapPosition = function () { return _this.cancelMapPosition(); };
        };
        anagraficaController.prototype.initMappa = function () {
            Microsoft.Maps.loadModule("Microsoft.Maps.Search");
            this.mapObj = new Microsoft.Maps.Map($("#mappaBing")[0], { credentials: "AvCv3p-UgCnQsBKohLfG71_6FT84OovVPBups8s28O5U6fEEXj9BSMFU3NX1Ee5N" });
            this.mapOptions = {};
            this.mapOptions.center = new Microsoft.Maps.Location(0, 0);
            this.mapOptions.zoom = 6;
            this.mapOptions.mapTypeId = 'a';
            this.mapObj.setView(this.mapOptions);
            this.pushPin = new Microsoft.Maps.Pushpin(this.mapOptions.center, {
                draggable: true,
            });
            this.mapObj.entities.insert(this.pushPin, 0);
        };
        //#endregion
        //#region Gestione Tab mappa
        anagraficaController.prototype.getLocationFromAddress = function (address) {
            var _this = this;
            var grOpts;
            grOpts = {
                where: address,
                callback: function (result, userData) {
                    if (result.results.length > 0) {
                        _this.scope.$apply(function () {
                            _this.mapOptions.center = result.results[0].location;
                            _this.mapOptions.zoom = 13;
                            _this.mapObj.setView(_this.mapOptions);
                            _this.pushPin.setLocation(result.results[0].location);
                        });
                    }
                    else
                        $.Notify({
                            caption: 'Posizione',
                            content: 'L\'indirizzo richiesto non è stato trovato.',
                            type: 'warning'
                        });
                }
            };
            var sm = new Microsoft.Maps.Search.SearchManager(this.mapObj);
            sm.geocode(grOpts);
        };
        anagraficaController.prototype.showTabMappa = function () {
            this.scope.isMapShowing = true;
            this.scope.popupAna.TmpIndirizzo = this.scope.popupAna.obj.Indirizzo;
            this.mapOptions.center = new Microsoft.Maps.Location(this.scope.popupAna.obj.Latitude, this.scope.popupAna.obj.Longitude);
            this.mapOptions.zoom = 13;
            this.pushPin.setLocation(new Microsoft.Maps.Location(this.scope.popupAna.obj.Latitude, this.scope.popupAna.obj.Longitude));
            this.mapObj.setView(this.mapOptions);
        };
        anagraficaController.prototype.okMapPosition = function () {
            var currentPos = this.pushPin.getLocation();
            this.scope.popupAna.obj.Latitude = currentPos.latitude;
            this.scope.popupAna.obj.Longitude = currentPos.longitude;
            this.scope.popupAna.obj.Indirizzo = this.scope.popupAna.TmpIndirizzo;
            this.cancelMapPosition();
        };
        anagraficaController.prototype.cancelMapPosition = function () {
            this.scope.isMapShowing = false;
        };
        //#endregion
        //#region Paginazione
        anagraficaController.prototype.makeRange = function () {
            var lista = [];
            var limit = Math.ceil(this.totalItems / this.howMany);
            for (var idx = 0; idx < limit; idx++) {
                lista.push(idx);
            }
            return lista;
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
        //#endregion
        //#region Aggiunta, modifica ed eliminazione
        anagraficaController.prototype.newAnagrafica = function () {
            var dlg = $("#dialog").data('dialog');
            this.scope.popupAna.type = "Aggiungi";
            this.scope.popupAna.obj = {};
            this.scope.popupAna.obj.Sesso = true.toString();
            this.scope.popupAna.obj.Latitude = 44.22;
            this.scope.popupAna.obj.Longitude = 11.6;
            dlg.open();
        };
        anagraficaController.prototype.editAnagrafica = function (anaObj) {
            var dlg = $("#dialog").data('dialog');
            this.scope.popupAna.type = "Modifica";
            this.scope.popupAna.obj = {};
            angular.copy(anaObj, this.scope.popupAna.obj);
            this.scope.popupAna.obj.Sesso = this.scope.popupAna.obj.Sesso.toString();
            dlg.open();
        };
        anagraficaController.prototype.okEdit = function (form) {
            var _this = this;
            console.log(form.$error);
            if (form.$valid) {
                this.scope.popupAna.obj.DataNascita = $("#newDate").val();
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
            }
        };
        anagraficaController.prototype.cancelEdit = function () {
            var dlg = $('#dialog').data('dialog');
            dlg.close();
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
        anagraficaController.$inject = ["$scope", "anagraficaService"];
        return anagraficaController;
    })();
    Caronte.anagraficaController = anagraficaController;
})(Caronte || (Caronte = {}));
//# sourceMappingURL=anagraficaController.js.map