var Caronte;
(function (Caronte) {
    var viaggioController = (function () {
        function viaggioController($scope, viagServ, passServ) {
            this.$scope = $scope;
            this.scope = $scope;
            this.service = viagServ;
            this.pService = passServ;
            this.scope.pageNumbers = [];
            this.scope.dipendenteList = [];
            this.scope.currentPage = 0;
            this.scope.currentPage_P = 0;
            this.howMany = 15;
            this.showPage(0);
            this.scope.popupVia = {};
            this.scope.popupPas = {};
            this.scope.SetArrowVisibility(true);
            this.scope.SetTitle("Gestione viaggi");
            Microsoft.Maps.loadModule("Microsoft.Maps.Search");
            this.initControlli();
            this.initBindMetodi();
            this.initMappa();
            //this.initControlli_P()
            this.initBindMetodi_P();
        }
        //#region Gestione Viaggio
        //#region Inizializzazione
        viaggioController.prototype.initControlli = function () {
            var _this = this;
            this.service.getDipendentiFilter(2, function (data) {
                _this.scope.dipendenteList = data["Dati"];
            });
            this.service.getStato(function (data) {
                _this.scope.statoList = data["Dati"];
            });
        };
        viaggioController.prototype.initBindMetodi = function () {
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
            this.scope.openReviewViaggio = function (idViaggio) { return _this.openReviewViaggio(idViaggio); };
            this.scope.openManagePasseggeri = function () { return _this.openManagePasseggeri(); };
            this.scope.closeManagePasseggeri = function () { return _this.closeManagePasseggeri(); };
        };
        viaggioController.prototype.initMappa = function () {
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
        viaggioController.prototype.getLocationFromAddress = function (address) {
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
                            icon: "<span class='mif-warning'></span>",
                            type: 'warning'
                        });
                }
            };
            var sm = new Microsoft.Maps.Search.SearchManager(this.mapObj);
            sm.geocode(grOpts);
        };
        viaggioController.prototype.showTabMappa = function (whichAddr) {
            this.scope.isMapShowing = true;
            if (this.scope.popupVia.obj.IDViaggio) {
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
            }
            else {
                this.mapOptions.center = new Microsoft.Maps.Location(0, 0);
                this.pushPin.setLocation(new Microsoft.Maps.Location(0, 0));
                this.mapOptions.zoom = 6;
            }
            this.mapObj.setView(this.mapOptions);
            this.cheMappa = whichAddr;
        };
        viaggioController.prototype.okMapPosition = function () {
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
        viaggioController.prototype.cancelMapPosition = function () {
            this.scope.isMapShowing = false;
        };
        //#endregion
        //#region Paginazione
        viaggioController.prototype.makeRange = function () {
            var lista = [];
            var limit = Math.ceil(this.totalItems / this.howMany);
            for (var idx = 0; idx < limit; idx++) {
                lista.push(idx);
            }
            return lista;
        };
        viaggioController.prototype.showPage = function (pageToNavigate) {
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
        viaggioController.prototype.newViaggio = function () {
            var dlg = $("#dialog").data('dialog');
            this.scope.popupVia.type = "Aggiungi";
            this.scope.popupVia.obj = {};
            dlg.open();
        };
        viaggioController.prototype.editViaggio = function (viaObj) {
            var dlg = $("#dialog").data('dialog');
            this.scope.popupVia.type = "Modifica";
            this.scope.popupVia.obj = {};
            angular.copy(viaObj, this.scope.popupVia.obj);
            this.scope.popupVia.obj.FKIDDipendente = this.scope.popupVia.obj.FKIDDipendente.toString();
            this.scope.popupVia.obj.FKIDStato = this.scope.popupVia.obj.FKIDStato.toString();
            dlg.open();
        };
        viaggioController.prototype.okEdit = function (form) {
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
                                content: 'Viaggio modificato con successo!',
                                icon: "<span class='mif-earth'></span>",
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
                            content: 'Si è verificato un errore durante la modifica del viaggio',
                            icon: "<span class='mif-cross'></span>",
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
                                content: 'Viaggio creato con successo!',
                                icon: "<span class='mif-earth'></span>",
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
                            content: 'Si è verificato un errore durante la creazione del viaggio',
                            icon: "<span class='mif-cross'></span>",
                            type: 'alert'
                        });
                        _this.service.getViaggi(_this.scope.currentPage, _this.howMany, function (data) {
                            _this.$scope.viaggioList = data["Dati"];
                        });
                    });
                }
            }
        };
        viaggioController.prototype.cancelEdit = function () {
            var dlg = $('#dialog').data('dialog');
            dlg.close();
        };
        viaggioController.prototype.removeViaggio = function (idVia) {
            var _this = this;
            if (confirm("Sei sicuro di voler eliminare questo viaggio?")) {
                this.service.deleteViaggio(idVia, function (result) {
                    if (result) {
                        $.Notify({
                            caption: 'Eliminazione',
                            content: 'Viaggio eliminato con successo!',
                            icon: "<span class='mif-earth'></span>",
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
                        content: 'Si è verificato un errore durante l\'eliminazione del viaggio',
                        icon: "<span class='mif-cross'></span>",
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
        viaggioController.prototype.openReviewViaggio = function (idViaggio) {
            console.log("MVSSOLINI HA SEMPRE RAGIONE");
            location.href = "/#JourneyReview?id=" + idViaggio;
        };
        //#endregion
        //#region finestra passeggeri
        viaggioController.prototype.openManagePasseggeri = function () {
            this.initControlli_P();
            this.initMappa_P();
            this.showPage_P(0);
            var dlg = $("#mgrPasseggeri").data('dialog');
            dlg.open();
        };
        viaggioController.prototype.closeManagePasseggeri = function () {
            //this.initMappa();
            var dlg = $("#mgrPasseggeri").data('dialog');
            dlg.close();
        };
        //#endregion
        //#endregion
        //#region Gestione Passeggeri
        //#region Inizializzazione
        viaggioController.prototype.initControlli_P = function () {
            var _this = this;
            //this.service.getDipendentiFilter(2,(data) => {
            //	this.scope.dipendenteList = data["Dati"];
            //});
            this.pService.getAnagrafiche(function (data) {
                _this.scope.anagraficaList = data["Dati"];
            });
        };
        viaggioController.prototype.initBindMetodi_P = function () {
            var _this = this;
            this.scope.newPasseggero = function () { return _this.newPasseggero(); };
            this.scope.editPasseggero = function (pasObj) { return _this.editPasseggero(pasObj); };
            this.scope.okEdit_P = function (form) { return _this.okEdit_P(form); };
            this.scope.cancelEdit_P = function () { return _this.cancelEdit_P(); };
            this.scope.removePasseggero = function (idPas) { return _this.removePasseggero(idPas); };
            this.scope.showPage_P = function (numPagina) { return _this.showPage_P(numPagina); };
            this.scope.showMapDiv_P = function (whichAddr) { return _this.showTabMappa_P(whichAddr); };
            this.scope.centerBingMap_P = function () { return _this.getLocationFromAddress_P(_this.scope.popupPas.TmpIndirizzo); };
            this.scope.okMapPosition_P = function () { return _this.okMapPosition_P(); };
            this.scope.cancelMapPosition_P = function () { return _this.cancelMapPosition_P(); };
        };
        viaggioController.prototype.initMappa_P = function () {
            this.mapObj_P = new Microsoft.Maps.Map($("#mappaBing_P")[0], { credentials: "AvCv3p-UgCnQsBKohLfG71_6FT84OovVPBups8s28O5U6fEEXj9BSMFU3NX1Ee5N" });
            this.mapOptions_P = {};
            this.mapOptions_P.center = new Microsoft.Maps.Location(0, 0);
            this.mapOptions_P.zoom = 6;
            this.mapOptions_P.mapTypeId = 'a';
            this.mapObj_P.setView(this.mapOptions_P);
            this.pushPin_P = new Microsoft.Maps.Pushpin(this.mapOptions_P.center, {
                draggable: true,
            });
            this.mapObj_P.entities.insert(this.pushPin_P, 0);
        };
        //#endregion
        //#region Gestione Tab mappa
        viaggioController.prototype.getLocationFromAddress_P = function (address) {
            var _this = this;
            var grOpts;
            grOpts = {
                where: address,
                callback: function (result, userData) {
                    if (result.results.length > 0) {
                        _this.scope.$apply(function () {
                            _this.mapOptions_P.center = result.results[0].location;
                            _this.mapOptions_P.zoom = 13;
                            _this.mapObj_P.setView(_this.mapOptions_P);
                            _this.pushPin_P.setLocation(result.results[0].location);
                        });
                    }
                    else
                        $.Notify({
                            caption: 'Posizione',
                            content: 'L\'indirizzo richiesto non è stato trovato.',
                            icon: "<span class='mif-warning'></span>",
                            type: 'warning'
                        });
                }
            };
            var sm = new Microsoft.Maps.Search.SearchManager(this.mapObj_P);
            sm.geocode(grOpts);
        };
        viaggioController.prototype.showTabMappa_P = function (whichAddr) {
            this.scope.isMapShowing_P = true;
            if (whichAddr == "part") {
                this.scope.popupPas.TmpIndirizzo = this.scope.popupPas.obj.IndirizzoSalita;
                this.mapOptions_P.center = new Microsoft.Maps.Location(this.scope.popupPas.obj.LatitudineSalitaPrevista, this.scope.popupPas.obj.LongitudineSalitaPrevista);
                this.pushPin_P.setLocation(new Microsoft.Maps.Location(this.scope.popupPas.obj.LatitudineSalitaPrevista, this.scope.popupPas.obj.LongitudineSalitaPrevista));
            }
            else {
                this.scope.popupPas.TmpIndirizzo = this.scope.popupPas.obj.IndirizzoDiscesa;
                this.mapOptions_P.center = new Microsoft.Maps.Location(this.scope.popupPas.obj.LatitudineDiscesaPrevista, this.scope.popupPas.obj.LongitudineDiscesaPrevista);
                this.pushPin_P.setLocation(new Microsoft.Maps.Location(this.scope.popupPas.obj.LatitudineDiscesaPrevista, this.scope.popupPas.obj.LongitudineDiscesaPrevista));
            }
            this.mapOptions_P.zoom = 13;
            this.mapObj_P.setView(this.mapOptions_P);
            this.cheMappa = whichAddr;
        };
        viaggioController.prototype.okMapPosition_P = function () {
            var currentPos = this.pushPin_P.getLocation();
            if (this.cheMappa == "part") {
                this.scope.popupPas.obj.LatitudineSalitaPrevista = currentPos.latitude;
                this.scope.popupPas.obj.LongitudineSalitaPrevista = currentPos.longitude;
                this.scope.popupPas.obj.IndirizzoSalita = this.scope.popupPas.TmpIndirizzo;
            }
            else {
                this.scope.popupPas.obj.LatitudineDiscesaPrevista = currentPos.latitude;
                this.scope.popupPas.obj.LongitudineDiscesaPrevista = currentPos.longitude;
                this.scope.popupPas.obj.IndirizzoDiscesa = this.scope.popupPas.TmpIndirizzo;
            }
            this.cancelMapPosition_P();
        };
        viaggioController.prototype.cancelMapPosition_P = function () {
            this.scope.isMapShowing_P = false;
        };
        //#endregion
        //#region Paginazione
        viaggioController.prototype.makeRange_P = function () {
            var lista = [];
            var limit = Math.ceil(this.totalItems_P / this.howMany);
            for (var idx = 0; idx < limit; idx++) {
                lista.push(idx);
            }
            return lista;
        };
        viaggioController.prototype.showPage_P = function (pageToNavigate) {
            var _this = this;
            console.log(this.scope.popupVia.obj);
            this.scope.currentPage_P = pageToNavigate;
            this.pService.getPasseggeri(this.scope.currentPage_P, this.howMany, this.scope.popupVia.obj.IDViaggio, function (data) {
                _this.scope.passeggeriList = data["Dati"];
                _this.totalItems_P = data["Totale"];
                _this.scope.pageNumbers_P = _this.makeRange();
            });
        };
        //#endregion
        //#region Aggiunta, modifica ed eliminazione
        viaggioController.prototype.newPasseggero = function () {
            var dlg = $("#dialogPasseggero").data('dialog');
            this.scope.popupPas.type = "Aggiungi";
            this.scope.popupPas.obj = {};
            this.scope.popupPas.obj.IDSpostamento = 0;
            this.scope.popupPas.obj.FKIDViaggio = this.scope.popupVia.obj.IDViaggio;
            this.scope.popupPas.obj.IndirizzoSalita = this.scope.popupVia.obj.IndirizzoPartenza;
            this.scope.popupPas.obj.IndirizzoDiscesa = this.scope.popupVia.obj.IndirizzoArrivo;
            this.scope.popupPas.obj.LatitudineSalitaPrevista = this.scope.popupVia.obj.LatitudinePartenzaPrevista;
            this.scope.popupPas.obj.LongitudineSalitaPrevista = this.scope.popupVia.obj.LongitudinePartenzaPrevista;
            this.scope.popupPas.obj.LatitudineDiscesaPrevista = this.scope.popupVia.obj.LatitudineArrivoPrevista;
            this.scope.popupPas.obj.LongitudineDiscesaPrevista = this.scope.popupVia.obj.LongitudineArrivoPrevista;
            this.scope.popupPas.obj.DataSalitaPrevista = this.scope.popupVia.obj.DataInizioPrevista;
            this.scope.popupPas.obj.DataDiscesaPrevista = this.scope.popupVia.obj.DataFinePrevista;
            dlg.open();
        };
        viaggioController.prototype.editPasseggero = function (pasObj) {
            console.log("quebab");
            var dlg = $("#dialogPasseggero").data('dialog');
            this.scope.popupPas.type = "Modifica";
            this.scope.popupPas.obj = {};
            angular.copy(pasObj, this.scope.popupPas.obj);
            this.scope.popupPas.obj.FKIDStato = this.scope.popupPas.obj.FKIDStato.toString();
            dlg.open();
        };
        viaggioController.prototype.okEdit_P = function (form) {
            var _this = this;
            console.log(form.$error);
            if (form.$valid) {
                var DataInizio = new Date($("#newDate_P").val());
                var DataFine = new Date($("#newDate_P").val());
                DataInizio.setHours($("#oraStr_P").val().split(':')[0]);
                DataInizio.setMinutes($("#oraStr_P").val().split(':')[1]);
                DataFine.setHours($("#oraFin_P").val().split(':')[0]);
                DataFine.setMinutes($("#oraFin_P").val().split(':')[1]);
                this.scope.popupPas.obj.DataSalitaPrevista = DataInizio;
                this.scope.popupPas.obj.DataDiscesaPrevista = DataFine;
                if (this.scope.popupPas.type == "Modifica") {
                    this.pService.editPasseggero(this.scope.popupPas.obj, function (result) {
                        if (result) {
                            $.Notify({
                                caption: 'Modifica',
                                content: 'Viaggio modificata con successo!',
                                icon: "<span class='mif-earth'></span>",
                                type: 'success'
                            });
                            _this.pService.getPasseggeri(_this.scope.popupVia.obj.IDViaggio, _this.scope.currentPage, _this.howMany, function (data) {
                                _this.$scope.passeggeriList = data["Dati"];
                            });
                            _this.cancelEdit();
                        }
                    }, function () {
                        $.Notify({
                            caption: 'Modifica',
                            content: 'Si è verificato un errore durante la modifica dell\'viaggio',
                            icon: "<span class='mif-cross'></span>",
                            type: 'alert'
                        });
                        _this.pService.getPasseggeri(_this.scope.popupVia.obj.IDViaggio, _this.scope.currentPage, _this.howMany, function (data) {
                            _this.$scope.passeggeriList = data["Dati"];
                        });
                    });
                }
                else {
                    this.pService.createPasseggero(this.scope.popupPas.obj, function (result) {
                        if (result) {
                            $.Notify({
                                caption: 'Modifica',
                                content: 'Viaggio creata con successo!',
                                icon: "<span class='mif-earth'></span>",
                                type: 'success'
                            });
                            _this.pService.getPasseggeri(_this.scope.popupVia.obj.IDViaggio, _this.scope.currentPage, _this.howMany, function (data) {
                                _this.$scope.passeggeriList = data["Dati"];
                            });
                            _this.cancelEdit();
                        }
                    }, function () {
                        $.Notify({
                            caption: 'Modifica',
                            content: 'Si è verificato un errore durante la creazione dell\'viaggio',
                            icon: "<span class='mif-cross'></span>",
                            type: 'alert'
                        });
                        _this.pService.getPasseggeri(_this.scope.popupVia.obj.IDViaggio, _this.scope.currentPage, _this.howMany, function (data) {
                            _this.$scope.passeggeriList = data["Dati"];
                        });
                    });
                }
            }
        };
        viaggioController.prototype.cancelEdit_P = function () {
            var dlg = $('#dialogPasseggero').data('dialog');
            dlg.close();
        };
        viaggioController.prototype.removePasseggero = function (idVia) {
            var _this = this;
            if (confirm("Sei sicuro di voler eliminare questa viaggio?")) {
                this.service.deleteViaggio(idVia, function (result) {
                    if (result) {
                        $.Notify({
                            caption: 'Eliminazione',
                            content: 'Viaggio eliminata con successo!',
                            icon: "<span class='mif-earth'></span>",
                            type: 'success'
                        });
                        _this.pService.getPasseggeri(_this.scope.popupVia.obj.IDViaggio, _this.scope.currentPage, _this.howMany, function (data) {
                            _this.$scope.passeggeriList = data["Dati"];
                        });
                    }
                }, function () {
                    $.Notify({
                        caption: 'Eliminazione',
                        content: 'Si è verificato un errore durante l\'eliminazione dell\'viaggio',
                        icon: "<span class='mif-cross'></span>",
                        type: 'alert'
                    });
                });
            }
        };
        viaggioController.$inject = ["$scope", "viaggioService", "passeggeroService"];
        return viaggioController;
    })();
    Caronte.viaggioController = viaggioController;
})(Caronte || (Caronte = {}));
//# sourceMappingURL=viaggioController.js.map