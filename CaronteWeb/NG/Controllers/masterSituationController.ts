module Caronte {
	interface IAppCtrlScope extends angular.IScope {
		viaggiVisualizzati: any;
		viaggiInCorsoList: any[];
		onViaggioCheck: Function;
	}

	export class masterSituationController {
		static $inject = ["$scope", "masterSituationService"];
		scope: IAppCtrlScope;
		service: masterSituationService;
		percorsi: any;
		mapOptions: Microsoft.Maps.ViewOptions;
		mapObj: Microsoft.Maps.Map;
		
		constructor(private $scope: IAppCtrlScope, mastSitServ: masterSituationService) {
			this.scope = $scope;
			this.service = mastSitServ;

			this.initBindMetodi();
			this.initMappa();
			this.initDati();
			
		}

		//#region Inizializzazione

		private initBindMetodi() {
			this.scope.onViaggioCheck = (IDViaggio) => this.onViaggioCheck(IDViaggio);
		}

		private initMappa() {
			Microsoft.Maps.loadModule("Microsoft.Maps.Search");

			this.mapObj = new Microsoft.Maps.Map($("#mappaBing")[0], {
				credentials: "AvCv3p-UgCnQsBKohLfG71_6FT84OovVPBups8s28O5U6fEEXj9BSMFU3NX1Ee5N",
				showDashboard: false
			});

			Microsoft.Maps.Events.addHandler(this.mapObj, "viewchangeend",() => {
				this.showHidePushPins();
			});

			this.mapOptions = {
				mapTypeId: 'r',
				center: new Microsoft.Maps.Location(46.1171403909027, 11.1043098004908),
				zoom: 6

			};

			this.mapObj.setView(this.mapOptions);
		}

		private initDati() {
			this.scope.viaggiVisualizzati = [];
			this.percorsi = [];

			this.scope.viaggiInCorsoList = [
				{ IDViaggio: 0, Descrizione: "Viaggio di Lorenzo" },
				{ IDViaggio: 1, Descrizione: "Viaggio di Andrea" }
			];

			this.service.getPosizioni(0,(data, IDV) => {
				this.initPollyLine(data, IDV);
			});

			this.service.getPosizioni(1,(data, IDV) => {
				this.initPollyLine(data, IDV);
			});
		}

		private initPollyLine(puntiLinea, idPerc: number) {
			var colore = this.makeRandomColour();
			
			var posList = [];

			for (var idx = 0; idx < puntiLinea.length; idx++) {
				posList.push(new Microsoft.Maps.Location(puntiLinea[idx].Latitudine, puntiLinea[idx].Longitudine));
			}		

			var pollyObj = {
				linea: new Microsoft.Maps.Polyline(posList, { strokeColor: colore, visible: true }),				
				pushpinPosAtt: new Microsoft.Maps.Pushpin(posList[posList.length - 1], {
					htmlContent: "<div style='font-size:32px; color: " + colore.toHex() + "' class='mif-truck'/>",
					anchor: new Microsoft.Maps.Point(16, 16)
				})
			};

			this.percorsi[idPerc] = pollyObj;
		}

		private showHidePushPins() {
			for (var idx = 0; idx < this.mapObj.entities.getLength(); idx++) {
				if (this.mapObj.entities.get(idx) instanceof Microsoft.Maps.Pushpin) {
					var pp = <Microsoft.Maps.Pushpin>this.mapObj.entities.get(idx);
					if (this.mapObj.getZoom() < 15)
						pp.setOptions({
							visible: false
						});
					else pp.setOptions({
						visible: true
					});
				}
			}
		}

		private makeRandomColour(): Microsoft.Maps.Color {
			return new Microsoft.Maps.Color(255, Math.round(255 * Math.random()), Math.round(255 * Math.random()), Math.round(255 * Math.random()));
		}

		//#endregion	

		private onViaggioCheck(IDViaggio: number) {
			if (this.scope.viaggiVisualizzati[IDViaggio] == undefined) {
				// get data;
			}
			else {
				this.showHidePercorsi(IDViaggio);
			}
		}

		private showHidePercorsi(IDViaggio: number) {
			if (this.scope.viaggiVisualizzati[IDViaggio]) {
				this.mapObj.entities.push(this.percorsi[IDViaggio].linea);
				this.mapObj.entities.push(this.percorsi[IDViaggio].pushpinPosAtt);
				this.showHidePushPins();
			}
			else {
				this.mapObj.entities.remove(this.percorsi[IDViaggio].linea);
				this.mapObj.entities.remove(this.percorsi[IDViaggio].pushpinPosAtt);
			}
		}
	}
}