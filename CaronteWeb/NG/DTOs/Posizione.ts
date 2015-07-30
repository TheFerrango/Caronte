module Caronte {
	export module CaronteDTOs {
		export class Posizione {
			IDPosizione: number;
			FKIDViaggio: number;
			Data: Date;
			Latitudine: number;
			Longitudine: number;
			Precisione: number;
		}
	}
}