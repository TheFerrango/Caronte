module Caronte {
	interface IAppCtrlScope extends angular.IScope {


	}

	export class masterSituationController {
		static $inject = ["$scope", "masterSituationService"];
		scope: IAppCtrlScope;
		service: any;
		mapOptions: Microsoft.Maps.ViewOptions;
		mapObj: Microsoft.Maps.Map;

		constructor(private $scope: IAppCtrlScope) {
			this.scope = $scope;

			this.initBindMetodi();
			this.initMappa();
			this.initPollyLine();
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

			console.log(polly);

			this.mapObj.entities.push(polly);
		}

		private initBindMetodi() {

		}

		private initMappa() {
			Microsoft.Maps.loadModule("Microsoft.Maps.Search");
			this.mapObj = new Microsoft.Maps.Map($("#mappaBing")[0], { credentials: "AvCv3p-UgCnQsBKohLfG71_6FT84OovVPBups8s28O5U6fEEXj9BSMFU3NX1Ee5N" })

			this.mapOptions = {};
			this.mapOptions.center = new Microsoft.Maps.Location(46.1171403909027, 11.1043098004908);
			this.mapOptions.zoom = 6;
			this.mapOptions.mapTypeId = 'a';
			this.mapObj.setView(this.mapOptions);
		}

		//#endregion	
	}
}