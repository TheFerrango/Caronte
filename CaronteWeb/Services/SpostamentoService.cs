using CaronteWeb.Database;
using CaronteWeb.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CaronteWeb.Services
{
	public class SpostamentoService : IService<SpostamentoDTO>
	{
		public IQueryable<SpostamentoDTO> GetAllIQ(CaronteContext caronteCtx)
		{
			return from sposta in caronteCtx.Spostamento
				   select new SpostamentoDTO
				   {
					   IDSpostamento = sposta.IDSpostamento,
					   FKIDAnagrafica = sposta.FKIDAnagrafica,
					   FKIDViaggio = sposta.FKIDViaggio,
					   FKIDStato = sposta.FKIDStato,
					   DescrizioneViaggio = sposta.DescrizioneViaggio,
					   DataSalitaPrevista = sposta.DataSalitaPrevista,
					   DataDiscesaPrevista = sposta.DataDiscesaPrevista,
					   DataSalitaEffettea = sposta.DataSalitaEffettea,
					   DataDiscesaEffettiva = sposta.DataDiscesaEffettiva,
					   LatitudineSalitaPrevista = sposta.LatitudineSalitaPrevista,
					   LongitudineSalitaPrevista = sposta.LongitudineSalitaPrevista,
					   LatitudineDiscesaPrevista = sposta.LatitudineDiscesaPrevista,
					   LongitudineDiscesaPrevista = sposta.LongitudineDiscesaPrevista,
					   LatitudineSalitaEffettiva = sposta.LatitudineSalitaEffettiva,
					   LongitudineSalitaEffettiva = sposta.LongitudineSalitaEffettiva,
					   LatitudineDiscesaEffettiva = sposta.LatitudineDiscesaEffettiva,
					   LongitudineDiscesaEffettiva = sposta.LongitudineDiscesaEffettiva
				   };
		}

		public Dictionary<string, object> GetAll(int? page, int? howMany)
		{
			using (CaronteContext caronteCtx = new CaronteContext())
			{
				Dictionary<string, object> toRet = new Dictionary<string, object>();
				IQueryable<SpostamentoDTO> spoList = GetAllIQ(caronteCtx).OrderBy(x => x.DataSalitaPrevista);
				toRet.Add("Totale", spoList.Count());

				if (page.HasValue && howMany.HasValue)
					spoList = spoList.Skip(page.Value * howMany.Value).Take(howMany.Value);

				toRet.Add("Dati", spoList.ToList());

				return toRet;
			}
		}

		public SpostamentoDTO Get(int ID)
		{
			using (CaronteContext caronteCtx = new CaronteContext())
			{
				return GetAllIQ(caronteCtx).FirstOrDefault(x => x.IDSpostamento == ID);
			}
		}

		public SpostamentoDTO New(SpostamentoDTO DTO)
		{
			using (CaronteContext caronteCtx = new CaronteContext())
			{
				Spostamento tmp = DTO.ToEntity();
				caronteCtx.Spostamento.Add(tmp);
				caronteCtx.SaveChanges();
				return this.Get(tmp.IDSpostamento);
			}
		}

		public SpostamentoDTO Update(SpostamentoDTO DTO)
		{
			using (CaronteContext caronteCtx = new CaronteContext())
			{
				Spostamento tmpAna = caronteCtx.Spostamento.Find(DTO.IDSpostamento);
				DTO.ToEntity(tmpAna);
				caronteCtx.SaveChanges();
				return this.Get(tmpAna.IDSpostamento);
			}
		}

		public bool Delete(int ID)
		{
			using (CaronteContext caronteCtx = new CaronteContext())
			{
				caronteCtx.Spostamento.Remove(caronteCtx.Spostamento.Find(ID));
				caronteCtx.SaveChanges();
				return true;
			}
		}
	}
}