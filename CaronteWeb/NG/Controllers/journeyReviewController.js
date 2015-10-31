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
            var _this = this;
            Microsoft.Maps.loadModule("Microsoft.Maps.Search");
            this.mapObj = new Microsoft.Maps.Map($("#mappaBing")[0], {
                credentials: "AvCv3p-UgCnQsBKohLfG71_6FT84OovVPBups8s28O5U6fEEXj9BSMFU3NX1Ee5N",
                showDashboard: false,
            });
            Microsoft.Maps.Events.addHandler(this.mapObj, "viewchangeend", function () {
                _this.showHidePushPins();
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
                    _this.scope.passeggeriTotali = dataPasseggeri.Dati.length;
                    console.log("caricati i passeggeri");
                    _this.service.getPosizioni(IDViaggio, function (dataPosizioni) {
                        _this.initPollyLine(dataPasseggeri);
                        _this.mapObj.entities.push(_this.percorso);
                        console.log("caricate le posizioni");
                        _this.scope.showLoading = false;
                    });
                });
            });
        };
        journeyReviewController.prototype.initPollyLine = function (puntiLinea) {
            var colore = new Microsoft.Maps.Color(255, 255, 255, 255);
            var coloreLinea = colore.clone();
            coloreLinea.a = 127;
            var posList = [];
            //var coop = this.simplifyPath(puntiLinea, 50);
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
                PUSHPIN_POS_ATTR: new Microsoft.Maps.Pushpin(posList[posList.length - 1], {
                    htmlContent: "<div style='font-size:32px; color: " + colore.toHex() + "' class='mif-truck'/>",
                    anchor: new Microsoft.Maps.Point(16, 16)
                }),
            };
            this.percorso = pollyObj;
        };
        journeyReviewController.prototype.showHidePushPins = function () {
            for (var idx = 0; idx < this.mapObj.entities.getLength(); idx++) {
                if (this.mapObj.entities.get(idx) instanceof Microsoft.Maps.Pushpin) {
                    var pp = this.mapObj.entities.get(idx);
                    if (this.mapObj.getZoom() < 15)
                        pp.setOptions({
                            visible: false
                        });
                    else
                        pp.setOptions({
                            visible: true
                        });
                }
            }
        };
        journeyReviewController.$inject = ["$scope", "journeyReviewService"];
        return journeyReviewController;
    })();
    Caronte.journeyReviewController = journeyReviewController;
})(Caronte || (Caronte = {}));
//# sourceMappingURL=journeyReviewController.js.map