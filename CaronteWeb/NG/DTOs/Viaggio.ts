module Caronte {
	export module CaronteDTOs {
		export interface Viaggio {
			IDViaggio: number;
			FKIDDipendente: number ;
			FKIDStato: number ;
			FKIDVeicolo: number ;
			DescrizioneViaggio: string;
			IndirizzoPartenza: string;
			IndirizzoArrivo: string;
			DataInizioPrevista: Date;
			DataFinePrevista: Date;
			DataInizioEffettiva?: Date ;
			DataFineEffettiva?: Date ;
			LatitudinePartenzaPrevista: number;
			LongitudinePartenzaPrevista: number;
			LatitudineArrivoPrevista: number;
			LongitudineArrivoPrevista: number;
			LatitudinePartenzaEffettiva?: number ;
			LongitudinePartenzaEffettiva?: number ;
			LatitudineArrivoEffettiva?: number ;
			LongitudineArrivoEffettiva?: number ;
            NOMINATIVO_AUTISTA: string;

			// Campi locali
			COLORE?: string;
		}
	}
}