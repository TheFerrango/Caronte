using Saidea.Lib.Security;
using Sistema381.DataBase;
using System;

namespace Sistema381.DTO
{
    public class <%TABLE_NAME_CAPITALIZE%>Assembler : AssemblerBase<<%TABLE_NAME_CAPITALIZE%>Assembler, <%TABLE_NAME_CAPITALIZE%>DTO, <%TABLE_NAME_CAPITALIZE%>>
    {
        public override <%TABLE_NAME_CAPITALIZE%> DtoToCreateDomainEntity(<%TABLE_NAME_CAPITALIZE%>DTO dto)
        {
            return new <%TABLE_NAME_CAPITALIZE%>()
            {
                <%ASSEMBLER_INSERT%>
            };
        }

        public override void DtoToUpdateDomainEntity(<%TABLE_NAME_CAPITALIZE%>DTO dto, <%TABLE_NAME_CAPITALIZE%> domainEntity)
        {
            <%ASSEMBLER_UPDATE%>
        }
    }
}