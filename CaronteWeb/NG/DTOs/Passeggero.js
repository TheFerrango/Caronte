var Caronte;
(function (Caronte) {
    var CaronteDTOs;
    (function (CaronteDTOs) {
        var Passeggero = (function () {
            function Passeggero() {
                this.IDSpostamento = 0;
                this.FKIDAnagrafica = null;
                this.FKIDViaggio = null;
                this.FKIDStato = null;
                this.DescrizioneViaggio = "";
                this.IndirizzoSalita = "";
                this.IndirizzoDiscesa = "";
                this.DataSalitaPrevista = new Date();
                this.DataDiscesaPrevista = new Date();
                this.DataSalitaEffettiva = null;
                this.DataDiscesaEffettiva = null;
                this.LatitudineSalitaPrevista = 0;
                this.LongitudineSalitaPrevista = 0;
                this.LatitudineDiscesaPrevista = 0;
                this.LongitudineDiscesaPrevista = 0;
                this.LatitudineSalitaEffettiva = null;
                this.LongitudineSalitaEffettiva = null;
                this.LatitudineDiscesaEffettiva = null;
                this.LongitudineDiscesaEffettiva = null;
                this.NOMINATIVO = "";
                this.STATO_DESC = "";
            }
            return Passeggero;
        })();
        CaronteDTOs.Passeggero = Passeggero;
    })(CaronteDTOs = Caronte.CaronteDTOs || (Caronte.CaronteDTOs = {}));
})(Caronte || (Caronte = {}));
//# sourceMappingURL=Passeggero.js.map