module Caronte {
	export module CaronteDTOs {
		export class ColorHolder {
			STATO: boolean;
			COLORE: Microsoft.Maps.Color;
		};

		export class PolylineHolder {
			LINEA: Microsoft.Maps.Polyline;
			PUSHPIN_POS_ATTR: Microsoft.Maps.Pushpin;
        }

        export class FullPercorsoHolder {
            LINEA: Microsoft.Maps.Polyline;
            PUSHPIN_START: Microsoft.Maps.Pushpin;
            PUSHPIN_FINISH: Microsoft.Maps.Pushpin;
        }
	}
}