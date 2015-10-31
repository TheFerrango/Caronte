module Caronte {
	export module CaronteDTOs {
		export class Passeggero {
         IDSpostamento :number = 0; 
		  FKIDAnagrafica : number = null;
		 FKIDViaggio : number = null; 
		  FKIDStato : number = null;
		 DescrizioneViaggio : string = "";
         IndirizzoSalita : string = "";
         IndirizzoDiscesa : string = "";
         DataSalitaPrevista: Date = new Date();
         DataDiscesaPrevista: Date = new Date();
         DataSalitaEffettiva: Date = null;
         DataDiscesaEffettiva: Date = null;
		 LatitudineSalitaPrevista: number = 0; 
		 LongitudineSalitaPrevista: number = 0; 
		 LatitudineDiscesaPrevista: number = 0; 
		 LongitudineDiscesaPrevista : number = 0;
		  LatitudineSalitaEffettiva : number = null; 
		 LongitudineSalitaEffettiva : number = null;
		 LatitudineDiscesaEffettiva : number = null; 
		 LongitudineDiscesaEffettiva : number = null;

         NOMINATIVO: string = "";
         STATO_DESC: string = "";
		}
	}
}