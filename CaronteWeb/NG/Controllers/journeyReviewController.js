var Caronte;
(function (Caronte) {
    var journeyReviewController = (function () {
        function journeyReviewController($scope, jouRevServ) {
            this.$scope = $scope;
            this.scope = $scope;
            this.service = jouRevServ;
            this.scope.SetArrowVisibility(true);
            this.scope.SetTitle("Riepilogo viaggio");
            this.scope.showLoading = true;
            this.initBindMetodi();
            this.initMappa();
            this.initSideBar();
            this.CaricaDatiViaggio(11);
        }
        //#region Inizializzazione
        journeyReviewController.prototype.initBindMetodi = function () {
        };
        journeyReviewController.prototype.initMappa = function () {
            Microsoft.Maps.loadModule("Microsoft.Maps.Search");
            this.mapObj = new Microsoft.Maps.Map($("#mappaBing")[0], {
                credentials: "AvCv3p-UgCnQsBKohLfG71_6FT84OovVPBups8s28O5U6fEEXj9BSMFU3NX1Ee5N",
                showDashboard: false,
            });
            Microsoft.Maps.Events.addHandler(this.mapObj, "viewchangeend", function () {
                //this.showHidePushPins();
            });
            this.mapOptions = {
                mapTypeId: 'r',
                center: new Microsoft.Maps.Location(46.1171403909027, 11.1043098004908),
                zoom: 6
            };
            this.mapObj.setView(this.mapOptions);
        };
        journeyReviewController.prototype.initSideBar = function () {
        };
        journeyReviewController.prototype.CaricaDatiViaggio = function (IDViaggio) {
            var _this = this;
            console.log("are you even loading?");
            this.service.getViaggio(IDViaggio, function (dataViaggio) {
                _this.scope.viaggio = dataViaggio;
                console.log("caricato il viaggio");
                _this.service.getPasseggeri(IDViaggio, function (dataPasseggeri) {
                    _this.scope.passeggeriCompleti = dataPasseggeri.Dati.filter(function (x) { return x.FKIDStato == 3; }).length;
                    _this.scope.passeggeriAnnullati = dataPasseggeri.Dati.filter(function (x) { return x.FKIDStato == 4; }).length;
                    _this.scope.passeggeriTotali = dataPasseggeri.Dati.length;
                    console.log("caricati i passeggeri");
                    _this.service.getPosizioni(IDViaggio, function (dataPosizioni) {
                        _this.initPollyLine(dataPosizioni);
                        _this.mapObj.entities.push(_this.percorso.LINEA);
                        _this.mapObj.entities.push(_this.percorso.PUSHPIN_START);
                        _this.mapObj.entities.push(_this.percorso.PUSHPIN_FINISH);
                        for (var idx = 0; idx < dataPasseggeri.Dati.length; idx++) {
                            var passeggero = dataPasseggeri.Dati[idx];
                            if (passeggero.FKIDStato == 3) {
                                _this.mapObj.entities.push(new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(passeggero.LatitudineSalitaEffettiva, passeggero.LongitudineSalitaEffettiva), {
                                    htmlContent: "<img src=\"/Images/Vecchietto.png\" width=\"32\" height=\"32\"/>",
                                    anchor: new Microsoft.Maps.Point(16, 16),
                                }));
                                _this.mapObj.entities.push(new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(passeggero.LatitudineDiscesaEffettiva, passeggero.LongitudineDiscesaEffettiva), {
                                    htmlContent: "<img src=\"/Images/TrafficStop.png\" width=\"32\" height=\"32\"/>",
                                    anchor: new Microsoft.Maps.Point(16, 16),
                                }));
                            }
                        }
                        console.log("caricate le posizioni");
                        _this.scope.showLoading = false;
                    });
                });
            });
        };
        journeyReviewController.prototype.initPollyLine = function (puntiLinea) {
            var colore = new Microsoft.Maps.Color(255, 255, 0, 0);
            var coloreLinea = colore.clone();
            coloreLinea.a = 127;
            var posList = [];
            var coop = puntiLinea;
            for (var idx = 0; idx < coop.length; idx++)
                if (coop[idx].Precisione) {
                    if (coop[idx].Precisione < 200)
                        posList.push(new Microsoft.Maps.Location(coop[idx].Latitudine, coop[idx].Longitudine));
                }
                else
                    posList.push(new Microsoft.Maps.Location(coop[idx].Latitudine, coop[idx].Longitudine));
            var pollyObj = {
                LINEA: new Microsoft.Maps.Polyline(posList, { strokeColor: coloreLinea, visible: true }),
                PUSHPIN_START: new Microsoft.Maps.Pushpin(posList[0], {
                    htmlContent: "<img src=\"/Images/Start.png\" width=\"32\" height=\"32\"/>",
                    anchor: new Microsoft.Maps.Point(16, 16),
                }),
                PUSHPIN_FINISH: new Microsoft.Maps.Pushpin(posList[posList.length - 1], {
                    htmlContent: "<img src=\"/Images/Finish.png\" width=\"32\" height=\"32\"/>",
                    anchor: new Microsoft.Maps.Point(16, 16),
                }),
            };
            Microsoft.Maps.Events.addHandler(pollyObj.PUSHPIN_FINISH, "mouseover", function (eventArgs) { return console.log("MVSSOLINI DVCE!"); });
            Microsoft.Maps.Events.addHandler(pollyObj.PUSHPIN_FINISH, "mouseout", function (eventArgs) { return console.log("MVSSOLINI SEMPRE!"); });
            this.percorso = pollyObj;
        };
        journeyReviewController.$inject = ["$scope", "journeyReviewService"];
        return journeyReviewController;
    })();
    Caronte.journeyReviewController = journeyReviewController;
})(Caronte || (Caronte = {}));
//# sourceMappingURL=journeyReviewController.js.map