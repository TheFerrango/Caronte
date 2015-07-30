var Caronte;
(function (Caronte) {
    var masterSituationController = (function () {
        function masterSituationController($scope, mastSitServ) {
            this.$scope = $scope;
            this.scope = $scope;
            this.service = mastSitServ;
            this.initBindMetodi();
            this.initMappa();
            this.initDati();
            this.initMenuViaggi();
        }
        //#region Inizializzazione
        masterSituationController.prototype.initBindMetodi = function () {
            var _this = this;
            this.scope.onViaggioCheck = function (IDViaggio) { return _this.onViaggioCheck(IDViaggio); };
        };
        masterSituationController.prototype.initMappa = function () {
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
        masterSituationController.prototype.initDati = function () {
            this.scope.viaggiVisualizzati = [];
            this.percorsi = [];
            this.availableColors = [
                {
                    STATO: false,
                    COLORE: new Microsoft.Maps.Color(255, 227, 5, 30)
                },
                {
                    STATO: false,
                    COLORE: new Microsoft.Maps.Color(255, 227, 5, 197)
                },
                {
                    STATO: false,
                    COLORE: new Microsoft.Maps.Color(255, 5, 227, 64)
                },
                {
                    STATO: false,
                    COLORE: new Microsoft.Maps.Color(255, 255, 217, 0)
                },
                {
                    STATO: false,
                    COLORE: new Microsoft.Maps.Color(255, 255, 123, 8)
                },
                {
                    STATO: false,
                    COLORE: new Microsoft.Maps.Color(255, 255, 0, 0)
                },
                {
                    STATO: false,
                    COLORE: new Microsoft.Maps.Color(255, 0, 255, 213)
                },
                {
                    STATO: false,
                    COLORE: new Microsoft.Maps.Color(255, 2, 255, 38)
                },
                {
                    STATO: false,
                    COLORE: new Microsoft.Maps.Color(255, 0, 0, 128)
                },
                {
                    STATO: false,
                    COLORE: new Microsoft.Maps.Color(255, 0, 128, 60)
                },
                {
                    STATO: false,
                    COLORE: new Microsoft.Maps.Color(255, 128, 0, 0)
                },
            ];
            this.colorIndex = 0;
        };
        masterSituationController.prototype.initMenuViaggi = function () {
            var _this = this;
            this.service.getViaggi(true, function (data) {
                _this.scope.viaggiInCorsoList = data["Dati"];
                for (var idx = 0; idx < _this.scope.viaggiInCorsoList.length; idx++) {
                    _this.scope.viaggiVisualizzati[_this.scope.viaggiInCorsoList[idx].IDViaggio] = false;
                }
            });
        };
        masterSituationController.prototype.initPollyLine = function (puntiLinea, idPerc) {
            var colore = this.availableColors[this.colorIndex];
            this.colorIndex += 1;
            this.colorIndex = this.colorIndex % 10;
            var coloreLinea = colore.COLORE.clone();
            coloreLinea.a = 127;
            var posList = [];
            var coop = this.simplifyPath(puntiLinea, 50);
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
                    htmlContent: "<div style='font-size:32px; color: " + colore.COLORE.toHex() + "' class='mif-truck'/>",
                    anchor: new Microsoft.Maps.Point(16, 16)
                }),
            };
            this.scope.viaggiInCorsoList.filter(function (x) { return x.IDViaggio == idPerc; })[0].COLORE = colore.COLORE.toHex();
            this.percorsi[idPerc] = pollyObj;
        };
        masterSituationController.prototype.showHidePushPins = function () {
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
        //#endregion	
        masterSituationController.prototype.onViaggioCheck = function (IDViaggio) {
            var _this = this;
            if (this.percorsi[IDViaggio] == undefined) {
                this.service.getPosizioni(IDViaggio, function (data, IDV) {
                    _this.initPollyLine(data, IDV);
                    _this.scope.viaggiVisualizzati[IDViaggio] = true;
                    _this.showHidePercorsi(IDViaggio);
                });
            }
            else {
                this.scope.viaggiVisualizzati[IDViaggio] = !this.scope.viaggiVisualizzati[IDViaggio];
                this.showHidePercorsi(IDViaggio);
            }
        };
        masterSituationController.prototype.showHidePercorsi = function (IDViaggio) {
            if (this.scope.viaggiVisualizzati[IDViaggio]) {
                this.mapObj.entities.push(this.percorsi[IDViaggio].LINEA);
                this.mapObj.entities.push(this.percorsi[IDViaggio].PUSHPIN_POS_ATTR);
                this.showHidePushPins();
            }
            else {
                this.mapObj.entities.remove(this.percorsi[IDViaggio].LINEA);
                this.mapObj.entities.remove(this.percorsi[IDViaggio].PUSHPIN_POS_ATTR);
            }
        };
        masterSituationController.prototype.simplifyPath = function (points, tolerance) {
            // helper classes 
            var Line = function (p1, p2) {
                this.p1 = p1;
                this.p2 = p2;
                this.distanceToPoint = function (point) {
                    // slope
                    var m = (this.p2.Longitudine - this.p1.Longitudine) / (this.p2.Latitudine - this.p1.Latitudine), 
                    // y offset
                    b = this.p1.Longitudine - (m * this.p1.Latitudine), d = [];
                    // distance to the linear equation
                    d.push(Math.abs(point.Longitudine - (m * point.Latitudine) - b) / Math.sqrt(Math.pow(m, 2) + 1));
                    // distance to p1
                    d.push(Math.sqrt(Math.pow((point.Latitudine - this.p1.Latitudine), 2) + Math.pow((point.Longitudine - this.p1.Longitudine), 2)));
                    // distance to p2
                    d.push(Math.sqrt(Math.pow((point.Latitudine - this.p2.Latitudine), 2) + Math.pow((point.Longitudine - this.p2.Longitudine), 2)));
                    // return the smallest distance
                    return d.sort(function (a, b) {
                        return (a - b); //causes an array to be sorted numerically and ascending
                    })[0];
                };
            };
            var douglasPeucker = function (points, tolerance) {
                if (points.length <= 2) {
                    return [points[0]];
                }
                var returnPoints = [], 
                // make line from start to end 
                line = new Line(points[0], points[points.length - 1]), 
                // find the largest distance from intermediate poitns to this line
                maxDistance = 0, maxDistanceIndex = 0, p;
                for (var i = 1; i <= points.length - 2; i++) {
                    var distance = line.distanceToPoint(points[i]);
                    if (distance > maxDistance) {
                        maxDistance = distance;
                        maxDistanceIndex = i;
                    }
                }
                // check if the max distance is greater than our tollerance allows 
                if (maxDistance >= tolerance) {
                    p = points[maxDistanceIndex];
                    line.distanceToPoint(p, true);
                    // include this point in the output 
                    returnPoints = returnPoints.concat(douglasPeucker(points.slice(0, maxDistanceIndex + 1), tolerance));
                    // returnPoints.push( points[maxDistanceIndex] );
                    returnPoints = returnPoints.concat(douglasPeucker(points.slice(maxDistanceIndex, points.length), tolerance));
                }
                else {
                    // ditching this point
                    p = points[maxDistanceIndex];
                    line.distanceToPoint(p, true);
                    returnPoints = [points[0]];
                }
                return returnPoints;
            };
            var band_sqr = tolerance * 360.0 / (2.0 * Math.PI * 6378137.0); /* Now in degrees */
            //band_sqr *= band_sqr;
            var arr = douglasPeucker(points, band_sqr);
            // always have to push the very last point on so it doesn't get left off
            arr.push(points[points.length - 1]);
            return arr;
        };
        masterSituationController.$inject = ["$scope", "masterSituationService"];
        return masterSituationController;
    })();
    Caronte.masterSituationController = masterSituationController;
})(Caronte || (Caronte = {}));
//# sourceMappingURL=masterSituationController.js.map