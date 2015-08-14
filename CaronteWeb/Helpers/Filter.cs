using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;

namespace CaronteWeb.Helpers
{
    public class Filter
    {
        public static Expression<Func<T, bool>> GetLinqFilter<T>(string filter)
        {
            if (!String.IsNullOrWhiteSpace(filter))
            {
                ParameterExpression instType = Expression.Parameter(typeof(T));
                List<BinaryExpression> listExpr = new List<BinaryExpression>();
                string[] filters = filter.Split(',');

                foreach (string filtro in filters)
                {
                    string[] dati = filtro.Split('=');
                    BinaryExpression be = Expression.Equal(
                        Expression.Property(instType, dati[0]),
                        Expression.Constant(dati[0], Expression.Property(instType, dati[0]).GetType()));
                    listExpr.Add(be);
                }


                BinaryExpression toRet = listExpr[0];
                for (int i = 1; i < listExpr.Count; i++)
                {
                    toRet = Expression.AndAlso(toRet, listExpr[i]);
                }

                return Expression.Lambda<Func<T, bool>>(toRet, instType);
            }
            return null;
        }
    }
}