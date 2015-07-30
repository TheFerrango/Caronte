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
	}
}