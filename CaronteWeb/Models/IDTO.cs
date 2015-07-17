
namespace CaronteWeb.Models
{
	public interface IDTO<T>
	{
		T ToEntity();
		T ToEntity(T toEdit);
	}
}
