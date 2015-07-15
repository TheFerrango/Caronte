var Caronte;
(function (Caronte) {
    var passeggeroController = (function () {
        function passeggeroController($scope, persServ) {
            this.$scope = $scope;
            this.scope = $scope;
            this.service = persServ;
            this.scope.pageNumbers = [];
            this.scope.dipendenteList = [];
            this.scope.currentPage = 0;
            this.howMany = 15;
            this.showPage(0);
            this.scope.popupVia = {};
            console.log("compra coop");
            this.initControlli();
            this.initBindMetodi();
            this.initMappa();
        }
        //#region Inizializzazione
        passeggeroController.prototype.initControlli = function () {
            var _this = this;
            this.service.getDipendentiFilter(2, function (data) {
                _this.scope.dipendenteList = data["Dati"];
            });
        };
        passeggeroController.prototype.initBindMetodi = function () {
            var _this = this;
            this.scope.newViaggio = function () { return _this.newViaggio(); };
            this.scope.editViaggio = function (viaObj) { return _this.editViaggio(viaObj); };
            this.scope.okEdit = function (form) { return _this.okEdit(form); };
            this.scope.cancelEdit = function () { return _this.cancelEdit(); };
            this.scope.removeViaggio = function (idVia) { return _this.removeViaggio(idVia); };
            this.scope.showPage = function (numPagina) { return _this.showPage(numPagina); };
            this.scope.showMapDiv = function (whichAddr) { return _this.showTabMappa(whichAddr); };
            this.scope.centerBingMap = function () { return _this.getLocationFromAddress(_this.scope.popupVia.TmpIndirizzo); };
            this.scope.okMapPosition = function () { return _this.okMapPosition(); };
            this.scope.cancelMapPosition = function () { return _this.cancelMapPosition(); };
            this.scope.newPasseggero = function () { return _this.newPasseggero(); };
            this.scope.closeManagePasseggeri = function () { return _this.closeManagePasseggeri(); };
        };
        passeggeroController.prototype.initMappa = function () {
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
        passeggeroController.prototype.getLocationFromAddress = function (address) {
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
        passeggeroController.prototype.showTabMappa = function (whichAddr) {
            this.scope.isMapShowing = true;
            if (whichAddr == "part") {
                this.scope.popupVia.TmpIndirizzo = this.scope.popupVia.obj.IndirizzoPartenza;
                this.mapOptions.center = new Microsoft.Maps.Location(this.scope.popupVia.obj.LatitudinePartenzaPrevista, this.scope.popupVia.obj.LongitudinePartenzaPrevista);
                this.pushPin.setLocation(new Microsoft.Maps.Location(this.scope.popupVia.obj.LatitudinePartenzaPrevista, this.scope.popupVia.obj.LongitudinePartenzaPrevista));
            }
            else {
                this.scope.popupVia.TmpIndirizzo = this.scope.popupVia.obj.IndirizzoArrivo;
                this.mapOptions.center = new Microsoft.Maps.Location(this.scope.popupVia.obj.LatitudineArrivoPrevista, this.scope.popupVia.obj.LongitudineArrivoPrevista);
                this.pushPin.setLocation(new Microsoft.Maps.Location(this.scope.popupVia.obj.LatitudineArrivoPrevista, this.scope.popupVia.obj.LongitudineArrivoPrevista));
            }
            this.mapOptions.zoom = 13;
            this.mapObj.setView(this.mapOptions);
            this.cheMappa = whichAddr;
        };
        passeggeroController.prototype.okMapPosition = function () {
            var currentPos = this.pushPin.getLocation();
            if (this.cheMappa == "part") {
                this.scope.popupVia.obj.LatitudinePartenzaPrevista = currentPos.latitude;
                this.scope.popupVia.obj.LongitudinePartenzaPrevista = currentPos.longitude;
                this.scope.popupVia.obj.IndirizzoPartenza = this.scope.popupVia.TmpIndirizzo;
            }
            else {
                this.scope.popupVia.obj.LatitudineArrivoPrevista = currentPos.latitude;
                this.scope.popupVia.obj.LongitudineArrivoPrevista = currentPos.longitude;
                this.scope.popupVia.obj.IndirizzoArrivo = this.scope.popupVia.TmpIndirizzo;
            }
            this.cancelMapPosition();
        };
        passeggeroController.prototype.cancelMapPosition = function () {
            this.scope.isMapShowing = false;
        };
        //#endregion
        //#region Paginazione
        passeggeroController.prototype.makeRange = function () {
            var lista = [];
            var limit = Math.ceil(this.totalItems / this.howMany);
            for (var idx = 0; idx < limit; idx++) {
                lista.push(idx);
            }
            return lista;
        };
        passeggeroController.prototype.showPage = function (pageToNavigate) {
            var _this = this;
            console.log(pageToNavigate);
            this.scope.currentPage = pageToNavigate;
            this.service.getViaggi(this.scope.currentPage, this.howMany, function (data) {
                _this.scope.viaggioList = data["Dati"];
                _this.totalItems = data["Totale"];
                _this.scope.pageNumbers = _this.makeRange();
            });
        };
        //#endregion
        //#region Aggiunta, modifica ed eliminazione
        passeggeroController.prototype.newViaggio = function () {
            var dlg = $("#dialog").data('dialog');
            this.scope.popupVia.type = "Aggiungi";
            this.scope.popupVia.obj = {};
            this.scope.popupVia.obj.Sesso = true.toString();
            this.scope.popupVia.obj.Latitude = 44.22;
            this.scope.popupVia.obj.Longitude = 11.6;
            dlg.open();
        };
        passeggeroController.prototype.editViaggio = function (viaObj) {
            var dlg = $("#dialog").data('dialog');
            this.scope.popupVia.type = "Modifica";
            this.scope.popupVia.obj = {};
            angular.copy(viaObj, this.scope.popupVia.obj);
            dlg.open();
        };
        passeggeroController.prototype.okEdit = function (form) {
            var _this = this;
            console.log(form.$error);
            if (form.$valid) {
                var DataInizio = new Date($("#newDate").val());
                var DataFine = new Date($("#newDate").val());
                DataInizio.setHours($("#oraStr").val().split(':')[0]);
                DataInizio.setMinutes($("#oraStr").val().split(':')[1]);
                DataFine.setHours($("#oraFin").val().split(':')[0]);
                DataFine.setMinutes($("#oraFin").val().split(':')[1]);
                this.scope.popupVia.obj.DataInizioPrevista = DataInizio;
                this.scope.popupVia.obj.DataFinePrevista = DataFine;
                if (this.scope.popupVia.type == "Modifica") {
                    this.service.editViaggio(this.scope.popupVia.obj, function (result) {
                        if (result) {
                            $.Notify({
                                caption: 'Modifica',
                                content: 'Viaggio modificata con successo!',
                                type: 'success'
                            });
                            _this.service.getViaggi(_this.scope.currentPage, _this.howMany, function (data) {
                                _this.$scope.viaggioList = data["Dati"];
                            });
                            _this.cancelEdit();
                        }
                    }, function () {
                        $.Notify({
                            caption: 'Modifica',
                            content: 'Si è verificato un errore durante la modifica dell\'viaggio',
                            type: 'alert'
                        });
                        _this.service.getViaggi(_this.scope.currentPage, _this.howMany, function (data) {
                            _this.$scope.viaggioList = data["Dati"];
                        });
                    });
                }
                else {
                    this.service.createViaggio(this.scope.popupVia.obj, function (result) {
                        if (result) {
                            $.Notify({
                                caption: 'Modifica',
                                content: 'Viaggio creata con successo!',
                                type: 'success'
                            });
                            _this.service.getViaggi(_this.scope.currentPage, _this.howMany, function (data) {
                                _this.$scope.viaggioList = data["Dati"];
                            });
                            _this.cancelEdit();
                        }
                    }, function () {
                        $.Notify({
                            caption: 'Modifica',
                            content: 'Si è verificato un errore durante la creazione dell\'viaggio',
                            type: 'alert'
                        });
                        _this.service.getViaggi(_this.scope.currentPage, _this.howMany, function (data) {
                            _this.$scope.viaggioList = data["Dati"];
                        });
                    });
                }
            }
        };
        passeggeroController.prototype.cancelEdit = function () {
            var dlg = $('#dialog').data('dialog');
            dlg.close();
        };
        passeggeroController.prototype.removeViaggio = function (idVia) {
            var _this = this;
            if (confirm("Sei sicuro di voler eliminare questa viaggio?")) {
                this.service.deleteViaggio(idVia, function (result) {
                    if (result) {
                        $.Notify({
                            caption: 'Eliminazione',
                            content: 'Viaggio eliminata con successo!',
                            type: 'success'
                        });
                        _this.service.getViaggi(_this.scope.currentPage, _this.howMany, function (data) {
                            _this.scope.viaggioList = data["Dati"];
                            _this.totalItems = data["Totale"];
                            _this.scope.pageNumbers = _this.makeRange();
                        });
                    }
                }, function () {
                    $.Notify({
                        caption: 'Eliminazione',
                        content: 'Si è verificato un errore durante l\'eliminazione dell\'viaggio',
                        type: 'alert'
                    });
                    _this.service.getViaggi(_this.scope.currentPage, _this.howMany, function (data) {
                        _this.$scope.viaggioList = data["Dati"];
                        _this.totalItems = data["Totale"];
                        _this.scope.pageNumbers = _this.makeRange();
                    });
                });
            }
        };
        //#endregion
        //#region 
        passeggeroController.prototype.newPasseggero = function () {
            var dlg = $("#mgrPasseggeri").data('dialog');
            dlg.open();
        };
        passeggeroController.prototype.closeManagePasseggeri = function () {
            console.log("chiudiPasseggeri");
            var dlg = $("#mgrPasseggeri").data('dialog');
            dlg.close();
        };
        passeggeroController.$inject = ["$scope", "viaggioService"];
        return passeggeroController;
    })();
    Caronte.passeggeroController = passeggeroController;
})(Caronte || (Caronte = {}));
//# sourceMappingURL=passeggeroController.js.map