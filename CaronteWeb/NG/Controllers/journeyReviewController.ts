module Caronte {
    interface IAppCtrlScope extends Caronte.ICaronteBaseScope {
        viaggio: CaronteDTOs.Viaggio;
        passeggeriCompleti: number;
        passeggeriTotali: number;
        passeggeriAnnullati: number;
        showLoading: boolean;
    }

    export class journeyReviewController {
        static $inject = ["$scope", "journeyReviewService"];
        scope: IAppCtrlScope;
        service: journeyReviewService;
        percorso: CaronteDTOs.FullPercorsoHolder;
        mapOptions: Microsoft.Maps.ViewOptions;
        mapObj: Microsoft.Maps.Map;
        lastOpen: Microsoft.Maps.Infobox;

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
            this.mapObj = new Microsoft.Maps.Map($("#mappaBing")[0], {
                credentials: "AvCv3p-UgCnQsBKohLfG71_6FT84OovVPBups8s28O5U6fEEXj9BSMFU3NX1Ee5N",
                showDashboard: false,
            });

            Microsoft.Maps.Events.addHandler(this.mapObj, "viewchangeend",() => {
                //this.showHidePushPins();
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
                    this.scope.passeggeriAnnullati = (<CaronteDTOs.Passeggero[]>dataPasseggeri.Dati).filter(x=> x.FKIDStato == 4).length;
                    
                    this.scope.passeggeriTotali = (<CaronteDTOs.Passeggero[]>dataPasseggeri.Dati).length;
                    console.log("caricati i passeggeri");
                    this.service.getPosizioni(IDViaggio,(dataPosizioni: CaronteDTOs.Posizione[]) => {
                        this.initPollyLine(dataPosizioni);
                        this.mapObj.entities.push(this.percorso.LINEA);
                        this.mapObj.entities.push(this.percorso.PUSHPIN_START);
                        this.mapObj.entities.push(this.percorso.PUSHPIN_FINISH);

                        for (var idx = 0; idx < dataPasseggeri.Dati.length; idx++) {

                            var passeggero: CaronteDTOs.Passeggero = dataPasseggeri.Dati[idx];

                            if (passeggero.FKIDStato == 3) {
                        
                                var sale = new Microsoft.Maps.Pushpin(
                                    new Microsoft.Maps.Location(passeggero.LatitudineSalitaEffettiva, passeggero.LongitudineSalitaEffettiva),
                                    {
                                        htmlContent: "<img src=\"/Images/Vecchietto.png\" width=\"32\" height=\"32\"/>",
                                        anchor: new Microsoft.Maps.Point(16, 16),
                                        infobox: new Microsoft.Maps.Infobox(new Microsoft.Maps.Location(passeggero.LatitudineSalitaEffettiva, passeggero.LongitudineSalitaEffettiva), {
                                            title: "Salita passeggero",
                                            description: this.FormatSTR("<span>{0}</span><table style=\"width:100%; text-align:left\"><tr><th>Ora prevista</th><th>Ora effettiva</th></tr><tr><td>{1}</td><td>{2}</td></tr></table><span>{3}</span> ",
                                                passeggero.NOMINATIVO,
                                                this.FormatDate(passeggero.DataSalitaPrevista),
                                                this.FormatDate(passeggero.DataSalitaEffettiva),
                                                passeggero.IndirizzoSalita),
                                            visible: false,
                                        }),
                                    });
                                
                                var scende = new Microsoft.Maps.Pushpin(
                                    new Microsoft.Maps.Location(passeggero.LatitudineDiscesaEffettiva, passeggero.LongitudineDiscesaEffettiva),
                                    {
                                        htmlContent: "<img src=\"/Images/TrafficStop.png\" width=\"32\" height=\"32\"/>",
                                        anchor: new Microsoft.Maps.Point(16, 16),
                                        infobox: new Microsoft.Maps.Infobox(new Microsoft.Maps.Location(passeggero.LatitudineDiscesaEffettiva, passeggero.LongitudineDiscesaEffettiva), {
                                            title: "Discesa passeggero",
                                            description: this.FormatSTR("<span>{0}</span><table style=\"width:100%; text-align:left\"><tr><th>Ora prevista</th><th>Ora effettiva</th></tr><tr><td>{1}</td><td>{2}</td></tr></table><span>{3}</span> ",
                                                passeggero.NOMINATIVO,
                                                this.FormatDate(passeggero.DataDiscesaPrevista),
                                                this.FormatDate(passeggero.DataDiscesaEffettiva),
                                                passeggero.IndirizzoSalita),

                                            

                                            visible: false,                                            
                                        }),
                                    });                               

                                Microsoft.Maps.Events.addHandler(sale, "mouseover",(eventArgs: Microsoft.Maps.MouseEventArgs) => {                                    
                                    if (this.lastOpen)
                                        this.lastOpen.setOptions({ visible: false });
                                    (<Microsoft.Maps.Infobox>eventArgs.target._infobox).setOptions({ visible: true });
                                    this.lastOpen = <Microsoft.Maps.Infobox>eventArgs.target._infobox;
                                });

                               

                                Microsoft.Maps.Events.addHandler(scende, "mouseover",(eventArgs: Microsoft.Maps.MouseEventArgs) => {
                                    if (this.lastOpen)
                                        this.lastOpen.setOptions({ visible: false });
                                    (<Microsoft.Maps.Infobox>eventArgs.target._infobox).setOptions({ visible: true });
                                    this.lastOpen = <Microsoft.Maps.Infobox>eventArgs.target._infobox;
                                });



                                this.mapObj.entities.push(sale);
                                this.mapObj.entities.push((<any>sale)._infobox);

                                this.mapObj.entities.push(scende);
                                this.mapObj.entities.push((<any>scende)._infobox);
                            }
                        }
                        console.log("caricate le posizioni");                        
                        this.scope.showLoading = false;
                    });
                });
            });
        }

        private initPollyLine(puntiLinea: CaronteDTOs.Posizione[]) {
            var colore = new Microsoft.Maps.Color(255, 255, 0, 0);
            var coloreLinea = colore.clone();
            coloreLinea.a = 127;

            var posList: Microsoft.Maps.Location[] = [];


            var coop = puntiLinea;

            for (var idx = 0; idx < coop.length; idx++)
                if (coop[idx].Precisione) {
                    if (coop[idx].Precisione < 200)
                        posList.push(new Microsoft.Maps.Location(coop[idx].Latitudine, coop[idx].Longitudine));
                } else posList.push(new Microsoft.Maps.Location(coop[idx].Latitudine, coop[idx].Longitudine));

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

            Microsoft.Maps.Events.addHandler(pollyObj.PUSHPIN_FINISH, "mouseover",(eventArgs: Microsoft.Maps.MouseEventArgs) => console.log("MVSSOLINI DVCE!"));
            Microsoft.Maps.Events.addHandler(pollyObj.PUSHPIN_FINISH, "mouseout",(eventArgs: Microsoft.Maps.MouseEventArgs) => console.log("MVSSOLINI SEMPRE!"));



            this.percorso = pollyObj;
        }
		

        public FormatSTR(strLine: string, ...params: any[]): string {

            for (var idx = 0; idx < params.length; idx++) {
                strLine = strLine.replace("{" + idx.toString() + "}", params[idx].toString());
                console.log(idx, params[idx])
            }
            return strLine;
        }

        public FormatDate(toFormatDate: Date): string {
            var toRet: string = "";
            toFormatDate = new Date(<any>toFormatDate);
            toRet = (toFormatDate.getHours() < 10 ? "0": "") + toFormatDate.getHours().toString() + ":";
            toRet += (toFormatDate.getMinutes() < 10 ? "0": "") + toFormatDate.getMinutes().toString();
            return toRet;
        }
     
        //#endregion	

    }
}