import { getCookies } from "@/libs/actions/Cookies";
import { SuccessCheck } from "@/libs/components/svgs";

const Premium = async () => {
  const { verifiedToken: token } = await getCookies();
  const monthlyLink =
    process.env.STRIPE_MONTHLY_PLAN_LINK + `?prefilled_email=${token?.email}`;
  const yearlyLink =
    process.env.STRIPE_YEARLY_PRICE_ID + `?prefilled_email=${token?.email}`;
  return (
    <div className="flex items-center h-[600px] gap-4 justify-center">
      {/* Monthly Card */}
      <div className="flex flex-col">
        <h4 className="text-white">{process.env.STRIPE_SECRET_KEY}</h4>
        <h4 className="text-white">{process.env.STRIPE_YEARLY_PRICE_ID}</h4>
        <h4 className="text-white">{process.env.STRIPE_MONTHLY_PRICE_ID}</h4>
      </div>
      <a
        target="blank"
        href={monthlyLink || "#"}
        className="flex flex-col  border border-sidebarNavHover h-[300px] justify-between bg-hoverBlue hover:bg-defaultBlue rounded-[5px] px-8 py-4"
      >
        <div className="flex flex-col gap-4">
          <p className="text-white ">Aylık Ödeme</p>
          <h2 className="text-white tracking-wide">
            50₺<span>/Ay</span>
          </h2>
          <div className="flex items-center gap-1">
            <SuccessCheck className="text-white w-[12px] h-[12px]" />
            <span className="text-white">Sınırsız Eğitim içeriği</span>
          </div>
          <div className="flex items-center gap-1">
            <SuccessCheck className="text-white w-[12px] h-[12px]" />
            <span className="text-white">Premium Videolara Erişim</span>
          </div>
        </div>
        <button className="text-almostBlack px-2 py-2 rounded-[5px] bg-white">
          Hemen Premiumlu Ol !
        </button>
      </a>
      {/* Yearly Card */}
      <a
        target="blank"
        href={yearlyLink || "#"}
        className="flex flex-col  border border-sidebarNavHover h-[300px] justify-between  hover:bg-defaultBlue rounded-[5px] px-8 py-4 group"
      >
        <div className="flex flex-col gap-4">
          <p className="text-white ">Yıllık Ödeme</p>
          <h2 className="text-white tracking-wide">
            500₺<span>/Yıl</span>
          </h2>
          <div className="flex items-center gap-1">
            <SuccessCheck className="text-white w-[12px] h-[12px]" />
            <span className="text-white font-bold">2 Ay İndirimli Ücret</span>
          </div>
          <div className="flex items-center gap-1">
            <SuccessCheck className="text-white w-[12px] h-[12px]" />
            <span className="text-white">Sınırsız Eğitim içeriği</span>
          </div>
          <div className="flex items-center gap-1">
            <SuccessCheck className="text-white w-[12px] h-[12px]" />
            <span className="text-white">Premium Videolara Erişim</span>
          </div>
        </div>
        <button className="text-white px-2 py-2 rounded-[5px] bg-hoverBlue group-hover:bg-white group-hover:text-almostBlack">
          Hemen Premiumlu Ol !
        </button>
      </a>
    </div>
  );
};

export default Premium;
