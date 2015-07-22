﻿module Caronte {
	interface IAppCtrlScope extends angular.IScope {
		viaggiVisualizzati: any;
		viaggiInCorsoList: any[];
		onViaggioCheck: Function;
	}

	export class masterSituationController {
		static $inject = ["$scope", "masterSituationService"];
		scope: IAppCtrlScope;
		service: any;
		percorsi: any;
		mapOptions: Microsoft.Maps.ViewOptions;
		mapObj: Microsoft.Maps.Map;



		constructor(private $scope: IAppCtrlScope) {
			this.scope = $scope;

			this.initBindMetodi();
			this.initMappa();
			this.initPollyLine();
			this.initPollyLine2();

			this.initDati();
		}

		//#region Inizializzazione

		private initPollyLine() {
			var puntiLinea =

				[{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0335295362867, 'Longitudine': 11.1273917813297 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0340023040771, 'Longitudine': 11.1263496614993 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0344207286835, 'Longitudine': 11.1261017248034 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0350160952657, 'Longitudine': 11.1257725674659 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0354817099869, 'Longitudine': 11.1256025824696 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0360720474273, 'Longitudine': 11.125344671309 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.036264, 'Longitudine': 11.125857 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0374572407454, 'Longitudine': 11.1243596300483 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0378314255022, 'Longitudine': 11.1243094805049 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.038205, 'Longitudine': 11.12434 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0392737668008, 'Longitudine': 11.1226897872984 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0403795912862, 'Longitudine': 11.1215154826641 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0408603772521, 'Longitudine': 11.1209663003683 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0413428395987, 'Longitudine': 11.1204336304218 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0418203566223, 'Longitudine': 11.119900457561 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0422963649035, 'Longitudine': 11.1193672008812 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0427722055465, 'Longitudine': 11.1188250593841 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0432434361428, 'Longitudine': 11.1182991787791 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0437020938843, 'Longitudine': 11.117788804695 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0441701393574, 'Longitudine': 11.1172736529261 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0446408670396, 'Longitudine': 11.1167545616627 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0451088286936, 'Longitudine': 11.1162357218564 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0455585177988, 'Longitudine': 11.1157323047519 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0460036806762, 'Longitudine': 11.1152415443212 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.046439288184, 'Longitudine': 11.1147614289075 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0468935035169, 'Longitudine': 11.1142665613443 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0473657399416, 'Longitudine': 11.1138041317463 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0482408670044, 'Longitudine': 11.1134614167711 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0484042101778, 'Longitudine': 11.1132517259686 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0485587672964, 'Longitudine': 11.1130251271043 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0492550536902, 'Longitudine': 11.1127778337502 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0494846424093, 'Longitudine': 11.1126706197558 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.050177048737, 'Longitudine': 11.1124281573956 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0510647924625, 'Longitudine': 11.1124401997727 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0511550132607, 'Longitudine': 11.1124455365167 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.051597650806, 'Longitudine': 11.1122874871503 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.052476, 'Longitudine': 11.111916 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0538922250271, 'Longitudine': 11.1100420821458 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0543792136014, 'Longitudine': 11.1095281038433 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0549694672227, 'Longitudine': 11.1092446278781 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0557774826884, 'Longitudine': 11.1092015448958 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.056553395465, 'Longitudine': 11.1093671713024 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.057110875845, 'Longitudine': 11.1095147766173 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0578440409154, 'Longitudine': 11.1097192112356 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0585653875023, 'Longitudine': 11.1099151801318 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0591025836766, 'Longitudine': 11.1100622825325 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0598334018141, 'Longitudine': 11.1102588381618 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.060453, 'Longitudine': 11.11298 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0613325890154, 'Longitudine': 11.1106763407588 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0619054920971, 'Longitudine': 11.11084070988 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0624673310667, 'Longitudine': 11.1109891533852 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0635948646814, 'Longitudine': 11.11129517667 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.064172, 'Longitudine': 11.1113 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0648984182626, 'Longitudine': 11.1115312110633 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0654724948108, 'Longitudine': 11.1114824283868 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0660453978926, 'Longitudine': 11.111326944083 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0666056443006, 'Longitudine': 11.1110589746386 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0669803153723, 'Longitudine': 11.1108589824289 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0675323475152, 'Longitudine': 11.1105512827635 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0677180904895, 'Longitudine': 11.1104471795261 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0750634875149, 'Longitudine': 11.1126731615514 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0754473786801, 'Longitudine': 11.1127258837223 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.075937, 'Longitudine': 11.112279 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0773434489965, 'Longitudine': 11.1124674696475 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0778935533017, 'Longitudine': 11.112304776907 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0786625929177, 'Longitudine': 11.1122848279774 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0791883058846, 'Longitudine': 11.1124888435006 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0797090735286, 'Longitudine': 11.1127316672355 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0802451800555, 'Longitudine': 11.1130047496408 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0807821247727, 'Longitudine': 11.1132919974625 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0813217516989, 'Longitudine': 11.1135665047914 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.08191, 'Longitudine': 11.11304 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0827566497028, 'Longitudine': 11.1132163926959 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.08181, 'Longitudine': 11.113131 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0837623104453, 'Longitudine': 11.1116480547935 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0841094888747, 'Longitudine': 11.1110164783895 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0844663064927, 'Longitudine': 11.1103710718453 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0852842815293, 'Longitudine': 11.1098203693738 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0850725695491, 'Longitudine': 11.1092742159963 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.085665, 'Longitudine': 11.108191 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.085865, 'Longitudine': 11.107815 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.086999, 'Longitudine': 11.10558 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.08721, 'Longitudine': 11.105849 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0864372272044, 'Longitudine': 11.1068279575557 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0886735414369, 'Longitudine': 11.1052833463689 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0886322058597, 'Longitudine': 11.1046697877929 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.088818, 'Longitudine': 11.103857 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0892398841679, 'Longitudine': 11.1036986578256 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.090326692403, 'Longitudine': 11.1034021878998 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0900624513808, 'Longitudine': 11.1031967354153 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0901970720467, 'Longitudine': 11.1034503253734 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.090865031811, 'Longitudine': 11.1030039605264 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0913869025694, 'Longitudine': 11.1027596874938 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.091754, 'Longitudine': 11.102595 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0923348987587, 'Longitudine': 11.1030954120274 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.092605919078, 'Longitudine': 11.1030870093201 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0931855812669, 'Longitudine': 11.1009557638317 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0933032631874, 'Longitudine': 11.1005639936775 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0934813786298, 'Longitudine': 11.0998739115894 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0937877371907, 'Longitudine': 11.0992549918592 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0942080896348, 'Longitudine': 11.0987436119467 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0946978442371, 'Longitudine': 11.0982837807387 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0951879341155, 'Longitudine': 11.0978153999895 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.095794, 'Longitudine': 11.097501 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0964801721275, 'Longitudine': 11.096616787836 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0969758778811, 'Longitudine': 11.0961889754981 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0974585078657, 'Longitudine': 11.0957590676844 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0979397129267, 'Longitudine': 11.0953004099429 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0984251927584, 'Longitudine': 11.0948397405446 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0989065654576, 'Longitudine': 11.0943870339543 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.0993943922222, 'Longitudine': 11.0939246043563 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1000583227724, 'Longitudine': 11.0933034215122 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1003912519664, 'Longitudine': 11.0929809696972 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1009105946869, 'Longitudine': 11.0925593599677 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1014509759843, 'Longitudine': 11.0921688470989 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1020065285265, 'Longitudine': 11.091791074723 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.102573229, 'Longitudine': 11.0914312396199 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1031348165125, 'Longitudine': 11.0911111347377 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.103704450652, 'Longitudine': 11.0908419080079 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1042812932283, 'Longitudine': 11.0906095616519 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1048669368029, 'Longitudine': 11.0904011875391 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1054586153477, 'Longitudine': 11.0902150254697 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.106038140133, 'Longitudine': 11.0900434479117 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.10636, 'Longitudine': 11.089995 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1076022870839, 'Longitudine': 11.0895860474557 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1081817280501, 'Longitudine': 11.0894065909088 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.108451314489, 'Longitudine': 11.0893965976516 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1093440465629, 'Longitudine': 11.089069051668 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1106731649488, 'Longitudine': 11.0886928718537 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1111319369341, 'Longitudine': 11.0889679275551 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1116284504533, 'Longitudine': 11.0884123295546 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1121892835945, 'Longitudine': 11.088247038424 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1129058381883, 'Longitudine': 11.0880178273944 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1132918391377, 'Longitudine': 11.0880218166858 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1137979384512, 'Longitudine': 11.0881118383259 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1142492201179, 'Longitudine': 11.0882830806077 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1145969014615, 'Longitudine': 11.0884291771799 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1148595903069, 'Longitudine': 11.0885258205235 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1150477640331, 'Longitudine': 11.0886325221509 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1152028292418, 'Longitudine': 11.0888995695859 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1154066771269, 'Longitudine': 11.0891127213836 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1156662646681, 'Longitudine': 11.0891388729215 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1158629879355, 'Longitudine': 11.0893690399826 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1160107608885, 'Longitudine': 11.0897623188794 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1162434425205, 'Longitudine': 11.0903739463538 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1163560114801, 'Longitudine': 11.0907114855945 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1166010679163, 'Longitudine': 11.0920766253026 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.116535, 'Longitudine': 11.091995 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1170894572999, 'Longitudine': 11.0926163453463 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1172202695161, 'Longitudine': 11.0929345339537 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1175827868283, 'Longitudine': 11.0939183179289 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1178204137832, 'Longitudine': 11.0945050511509 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.118055190891, 'Longitudine': 11.0950720869005 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1182552669197, 'Longitudine': 11.0956360213459 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1184719391167, 'Longitudine': 11.0961968544871 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1185790598392, 'Longitudine': 11.0970632079989 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1186098214239, 'Longitudine': 11.0975051857531 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1185871902853, 'Longitudine': 11.0981725528836 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.118477890268, 'Longitudine': 11.0989362280816 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1183825880289, 'Longitudine': 11.0995658766478 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1183704019959, 'Longitudine': 11.1004063177227 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1183324015551, 'Longitudine': 11.1005717139639 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1182751928783, 'Longitudine': 11.1011068545994 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1183476002675, 'Longitudine': 11.1033250854284 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1180619163008, 'Longitudine': 11.1038275167078 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.117942159564, 'Longitudine': 11.1048594607866 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1187596954881, 'Longitudine': 11.0991956117736 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1171403909027, 'Longitudine': 11.1035744324481 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1169832305936, 'Longitudine': 11.1031737899543 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.116699334234, 'Longitudine': 11.1035904474556 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.11676375, 'Longitudine': 11.103759375 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1165529023856, 'Longitudine': 11.104497956112 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1167817245919, 'Longitudine': 11.1041251434819 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1166367214173, 'Longitudine': 11.1044657696038 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1167817245919, 'Longitudine': 11.1041251434819 },
					{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.116833927663, 'Longitudine': 11.1043098004908 },
				];


			var posList = [];



			for (var idx = 0; idx < puntiLinea.length; idx++) {
				posList.push(new Microsoft.Maps.Location(puntiLinea[idx].Latitudine, puntiLinea[idx].Longitudine));
			}


			var polly = new Microsoft.Maps.Polyline(posList);

			this.percorsi[1] = polly;
		}

		private initPollyLine2() {
			var puntiLinea = [{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.116921446722, 'Longitudine': 11.1038746566696 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1168070296113, 'Longitudine': 11.1037423257249 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1168230427709, 'Longitudine': 11.1039306985246 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1168070296113, 'Longitudine': 11.1037423257249 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1168106281279, 'Longitudine': 11.103946231406 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1165109090507, 'Longitudine': 11.10372078605 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1167922967348, 'Longitudine': 11.1039368782116 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1167864285714, 'Longitudine': 11.1037607142857 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.116818002747, 'Longitudine': 11.1038727574945 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1166218016297, 'Longitudine': 11.1033202148974 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.116818002747, 'Longitudine': 11.1038727574945 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.116865003204, 'Longitudine': 11.1037248562023 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1170240452617, 'Longitudine': 11.1032984299859 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.116900248453, 'Longitudine': 11.1032004375011 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1181995783402, 'Longitudine': 11.1047568336986 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1179068312049, 'Longitudine': 11.1031292751431 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1182822620861, 'Longitudine': 11.1011376096577 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1183910048503, 'Longitudine': 11.1002678423466 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.118462, 'Longitudine': 11.100025 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1186220590025, 'Longitudine': 11.0967129282653 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1183495633304, 'Longitudine': 11.0959625802934 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1178559530526, 'Longitudine': 11.0946445260197 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1174740735441, 'Longitudine': 11.0936539527029 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.117181, 'Longitudine': 11.092709 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1641473, 'Longitudine': 11.0867314 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1697207391262, 'Longitudine': 11.0871525295079 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.170071605593, 'Longitudine': 11.0874796751887 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1706070415676, 'Longitudine': 11.0881325416267 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1711959540844, 'Longitudine': 11.0887248069048 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1717782448977, 'Longitudine': 11.0892907530069 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1723827477545, 'Longitudine': 11.0898400191218 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1729934532195, 'Longitudine': 11.0903608705848 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.173592088744, 'Longitudine': 11.0908548161387 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1742152832448, 'Longitudine': 11.0913476720452 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1748375557363, 'Longitudine': 11.0918084252626 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1754827108234, 'Longitudine': 11.0922195576131 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1759245209396, 'Longitudine': 11.0924581065774 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1765980068594, 'Longitudine': 11.0929014254361 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.177265625447, 'Longitudine': 11.0933561436832 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1781338229775, 'Longitudine': 11.0939712077379 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1788073927164, 'Longitudine': 11.0943997744471 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1794774420559, 'Longitudine': 11.0948280058801 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1803703662008, 'Longitudine': 11.0953994840384 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1810323689133, 'Longitudine': 11.0958263743669 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1816754285246, 'Longitudine': 11.0962429549545 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1823269538581, 'Longitudine': 11.0966530814767 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1829783115536, 'Longitudine': 11.0970870964229 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1836334411055, 'Longitudine': 11.0975026711822 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1842566356063, 'Longitudine': 11.0979203414172 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1848554387689, 'Longitudine': 11.0983228404075 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1854179482907, 'Longitudine': 11.0986846871674 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.185928909108, 'Longitudine': 11.099006133154 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1864116229117, 'Longitudine': 11.0993085522205 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1868023034185, 'Longitudine': 11.0996947903186 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1871501524001, 'Longitudine': 11.1001514364034 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1873922217637, 'Longitudine': 11.100536249578 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1875325348228, 'Longitudine': 11.1008262634277 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1876472830772, 'Longitudine': 11.1011401657015 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.187881808728, 'Longitudine': 11.1012226436287 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1880548950285, 'Longitudine': 11.1009834241122 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1882299091667, 'Longitudine': 11.1007083300501 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1885077692568, 'Longitudine': 11.1008096672595 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1888745613396, 'Longitudine': 11.1010176222771 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1893067322671, 'Longitudine': 11.1012784671038 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1897861771286, 'Longitudine': 11.1015752702951 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1902716569602, 'Longitudine': 11.1018801201135 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1907779239118, 'Longitudine': 11.1021681223065 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1912781558931, 'Longitudine': 11.1024740617722 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1917770467699, 'Longitudine': 11.1027939990163 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.19224794209, 'Longitudine': 11.1030871979892 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1926726531237, 'Longitudine': 11.1033673211932 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1930057499558, 'Longitudine': 11.1036095581949 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1931562051177, 'Longitudine': 11.1039315909147 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1931900680065, 'Longitudine': 11.1042793560773 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1933759786189, 'Longitudine': 11.1044359300286 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.193534983322, 'Longitudine': 11.1042054276913 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.193521656096, 'Longitudine': 11.103871492669 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1936269327998, 'Longitudine': 11.1035504657775 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1937535833567, 'Longitudine': 11.1031911335886 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.193965645507, 'Longitudine': 11.1027701105922 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1942013446242, 'Longitudine': 11.1024419590831 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1945026740432, 'Longitudine': 11.102299131453 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1948567256331, 'Longitudine': 11.1021492630243 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1952139623463, 'Longitudine': 11.1019909288734 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.195556614548, 'Longitudine': 11.1017926130444 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1957987677306, 'Longitudine': 11.1016169283539 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1961449403316, 'Longitudine': 11.1014286708087 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1968126427382, 'Longitudine': 11.1010416783392 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.197232156992, 'Longitudine': 11.1008125171065 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1976241786033, 'Longitudine': 11.100594419986 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1980311200023, 'Longitudine': 11.100488724187 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1984647158533, 'Longitudine': 11.1004761513323 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1988838948309, 'Longitudine': 11.1005015484989 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1992717254907, 'Longitudine': 11.1005194019526 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1996588017792, 'Longitudine': 11.1005341541022 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.1999968439341, 'Longitudine': 11.1005614791065 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2003265880048, 'Longitudine': 11.1005992814898 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2005689926445, 'Longitudine': 11.1005456373096 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2007400672883, 'Longitudine': 11.1005243472755 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2008781172335, 'Longitudine': 11.1006839387119 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2010751757771, 'Longitudine': 11.1006549373269 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2013454083353, 'Longitudine': 11.1006144527346 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2016322370619, 'Longitudine': 11.1006521712989 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2019757274538, 'Longitudine': 11.1006474774331 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2023898772895, 'Longitudine': 11.1006820946932 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2028199527413, 'Longitudine': 11.1007171310484 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2032350245863, 'Longitudine': 11.1007300391793 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2036633398384, 'Longitudine': 11.1007374990731 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2040748074651, 'Longitudine': 11.1007496528327 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2045043800026, 'Longitudine': 11.1007690988481 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2049198709428, 'Longitudine': 11.1008037161082 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2053126469254, 'Longitudine': 11.1008197255433 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2056742422283, 'Longitudine': 11.1008337233216 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2060102727264, 'Longitudine': 11.1008579470217 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2062675971538, 'Longitudine': 11.100874459371 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2064544297755, 'Longitudine': 11.1010155268013 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2066744547337, 'Longitudine': 11.1009742878377 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2069139257073, 'Longitudine': 11.1009087413549 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2072073761374, 'Longitudine': 11.1009325459599 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2083443813026, 'Longitudine': 11.1096296086907 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2082913238555, 'Longitudine': 11.1105001531541 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2082360032946, 'Longitudine': 11.1112275347114 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2082491628826, 'Longitudine': 11.1120808124542 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2081425450742, 'Longitudine': 11.112706521526 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2080231867731, 'Longitudine': 11.113140117377 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2080350052565, 'Longitudine': 11.1134876310825 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.208165762946, 'Longitudine': 11.1137826740742 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2083914037794, 'Longitudine': 11.1140267550945 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2087151128799, 'Longitudine': 11.11422624439 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2090689968318, 'Longitudine': 11.1144471913576 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2094238866121, 'Longitudine': 11.1146552301943 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2097670417279, 'Longitudine': 11.1148679628968 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.210071220994, 'Longitudine': 11.1150637641549 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2103722151369, 'Longitudine': 11.1152247805148 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.210673712194, 'Longitudine': 11.1154121160507 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2109529133886, 'Longitudine': 11.1155940033495 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.211209, 'Longitudine': 11.11563 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2115766666667, 'Longitudine': 11.1159666666667 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2116683333333, 'Longitudine': 11.1161983333333 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.211875, 'Longitudine': 11.116695 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.211872, 'Longitudine': 11.116574 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.211851, 'Longitudine': 11.116192 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2124422937632, 'Longitudine': 11.1168595030904 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2127063237131, 'Longitudine': 11.1169926077127 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2130001094192, 'Longitudine': 11.1171031650156 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.213232204318, 'Longitudine': 11.1171665322036 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2134822364897, 'Longitudine': 11.1172968707979 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2137529719621, 'Longitudine': 11.1174379382283 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2139804568142, 'Longitudine': 11.117553692311 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2141936924309, 'Longitudine': 11.1176484916359 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.21434950792, 'Longitudine': 11.1177423604259 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2144109243723, 'Longitudine': 11.1178315198492 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.214727, 'Longitudine': 11.118261 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2148142857143, 'Longitudine': 11.1183771428571 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.214834, 'Longitudine': 11.118644 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2148266666667, 'Longitudine': 11.1185233333333 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2150572799146, 'Longitudine': 11.1192386224866 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2152240797877, 'Longitudine': 11.1196290515363 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2151201441884, 'Longitudine': 11.1199050676078 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2149571161717, 'Longitudine': 11.1200639046729 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2148152943701, 'Longitudine': 11.1202177964151 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2147381808609, 'Longitudine': 11.1203809082508 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2148510012776, 'Longitudine': 11.1204337980598 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2149406876415, 'Longitudine': 11.1204761266708 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.215002797544, 'Longitudine': 11.1208024341613 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2150469701737, 'Longitudine': 11.1209161765873 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2150361575186, 'Longitudine': 11.1210375465453 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2150471378118, 'Longitudine': 11.1208272445947 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2150034680963, 'Longitudine': 11.1207410786301 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2148413821138, 'Longitudine': 11.1204618157182 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2149515002966, 'Longitudine': 11.1206040345132 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.21455, 'Longitudine': 11.120465 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2148142885417, 'Longitudine': 11.1204658169299 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.214889222756, 'Longitudine': 11.1202868632972 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2150268536061, 'Longitudine': 11.1200742144138 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.214995, 'Longitudine': 11.119855 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2153130955994, 'Longitudine': 11.1199751403183 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2153981719166, 'Longitudine': 11.1198573745787 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2153401691467, 'Longitudine': 11.1197132896632 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2151628080755, 'Longitudine': 11.1193411331624 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2150640692562, 'Longitudine': 11.119028152898 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.21501, 'Longitudine': 11.11878875 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.21511, 'Longitudine': 11.118817 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.215435, 'Longitudine': 11.118736 },
				//{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2146772, 'Longitudine': 11.1096068 },
				//{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2192303772435, 'Longitudine': 11.1238262285977 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.216633, 'Longitudine': 11.11855 },
				//{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2192303772435, 'Longitudine': 11.1238262285977 },
				{ 'IDPosizione': 0, 'FKIDViaggio': 1, 'Latitudine': 46.2166178571429, 'Longitudine': 11.1185271428571 },
			];


			var posList = [];



			for (var idx = 0; idx < puntiLinea.length; idx++) {
				posList.push(new Microsoft.Maps.Location(puntiLinea[idx].Latitudine, puntiLinea[idx].Longitudine));
			}


			var polly = new Microsoft.Maps.Polyline(posList, { strokeColor: new Microsoft.Maps.Color(255, 0, 0, 255), visible: true });

			this.percorsi[0] = polly;
		}

		private initDati() {
			this.scope.viaggiVisualizzati = [];
			this.scope.viaggiInCorsoList = [{ IDViaggio: 0, Descrizione: "Viaggio di Lorenzo" }, { IDViaggio: 1, Descrizione: "Viaggio di Andrea" }, ];

		}

		private initBindMetodi() {
			this.scope.onViaggioCheck = (IDViaggio) => this.onViaggioCheck(IDViaggio);
		}

		private initMappa() {
			Microsoft.Maps.loadModule("Microsoft.Maps.Search");
			this.mapObj = new Microsoft.Maps.Map($("#mappaBing")[0], { credentials: "AvCv3p-UgCnQsBKohLfG71_6FT84OovVPBups8s28O5U6fEEXj9BSMFU3NX1Ee5N", showDashboard: false })

			this.mapOptions = {};
			this.mapOptions.center = new Microsoft.Maps.Location(46.1171403909027, 11.1043098004908);
			this.mapOptions.zoom = 6;
			this.mapOptions.mapTypeId = 'a';
			this.mapObj.setView(this.mapOptions);
		}

		//#endregion	

		private onViaggioCheck(IDViaggio: number) {
			if (this.scope.viaggiVisualizzati[IDViaggio])
				this.mapObj.entities.push(this.percorsi[IDViaggio]);
			else this.mapObj.entities.remove(this.percorsi[IDViaggio]);
		}
	}
}