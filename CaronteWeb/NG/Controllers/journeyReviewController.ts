module Caronte {
	interface IAppCtrlScope extends Caronte.ICaronteBaseScope {
        viaggio: CaronteDTOs.Viaggio;
        passeggeriCompleti: number;
        passeggeriTotali: number;
        showLoading: boolean;
	}

    export class journeyReviewController {
        static $inject = ["$scope", "journeyReviewService"];
		scope: IAppCtrlScope;
        service: journeyReviewService;		
		percorso: CaronteDTOs.PolylineHolder;
		mapOptions: Microsoft.Maps.ViewOptions;
		mapObj: Microsoft.Maps.Map;
		
        constructor(private $scope: IAppCtrlScope, jouRevServ: journeyReviewService) {
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

		private initBindMetodi() {
			
		}

		private initMappa() {
			Microsoft.Maps.loadModule("Microsoft.Maps.Search");

			this.mapObj = new Microsoft.Maps.Map($("#mappaBing")[0], {
				credentials: "AvCv3p-UgCnQsBKohLfG71_6FT84OovVPBups8s28O5U6fEEXj9BSMFU3NX1Ee5N",
				showDashboard: false,

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

		
        private initSideBar() {

			
		}

        private CaricaDatiViaggio(IDViaggio: number) {
            console.log("are you even loading?");
            this.service.getViaggio(IDViaggio,(dataViaggio: CaronteDTOs.Viaggio) => {
                this.scope.viaggio = dataViaggio;
                console.log("caricato il viaggio");
                this.service.getPasseggeri(IDViaggio,(dataPasseggeri) => {
                    this.scope.passeggeriCompleti = (<CaronteDTOs.Passeggero[]>dataPasseggeri.Dati).filter(x=> x.FKIDStato == 3).length;
                    this.scope.passeggeriTotali = (<CaronteDTOs.Passeggero[]>dataPasseggeri.Dati).length;
                    console.log("caricati i passeggeri");
                    this.service.getPosizioni(IDViaggio,(dataPosizioni: CaronteDTOs.Posizione[]) => {
                        this.initPollyLine(dataPasseggeri);
                        this.mapObj.entities.push(this.percorso);
                        console.log("caricate le posizioni");
                        this.scope.showLoading = false;
                    });
                });
            });
        }

        private initPollyLine(puntiLinea) {
            var colore = new Microsoft.Maps.Color(255, 255, 255, 255);
            var coloreLinea = colore.clone();
            coloreLinea.a = 127;

            var posList: Microsoft.Maps.Location[] = [];
            //var coop = this.simplifyPath(puntiLinea, 50);

            var coop = puntiLinea;

            for (var idx = 0; idx < coop.length; idx++)
                if (coop[idx].Precisione) {
                    if (coop[idx].Precisione < 200)
                        posList.push(new Microsoft.Maps.Location(coop[idx].Latitudine, coop[idx].Longitudine));
                } else posList.push(new Microsoft.Maps.Location(coop[idx].Latitudine, coop[idx].Longitudine));

            var pollyObj = {
                LINEA: new Microsoft.Maps.Polyline(posList, { strokeColor: coloreLinea, visible: true }),
                PUSHPIN_POS_ATTR: new Microsoft.Maps.Pushpin(posList[posList.length - 1], {
                    htmlContent: "<div style='font-size:32px; color: " + colore.toHex() + "' class='mif-truck'/>",
                    anchor: new Microsoft.Maps.Point(16, 16)
                }),
            };
            this.percorso = pollyObj;
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

     
		//#endregion	

	}
}