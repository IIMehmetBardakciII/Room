import { getCookies } from "@/libs/actions/Cookies";

const Premium = async () => {
  const { verifiedToken: token, success } = await getCookies();
  const monthlyLink =
    process.env.STRIPE_MONTHLY_PLAN_LINK + `?prefilled_email=${token?.email}`;
  const yearlyLink =
    process.env.STRIPE_YEARLY_PLAN_LINK + `?prefilled_email=${token?.email}`;
  return (
    <div className="flex  gap-4">
      <button className="text-white px-4 py-2 bg-hoverBlue hover:bg-defaultBlue">
        <a target="blank" href={monthlyLink || "#"}>
          Monthly 50₺
        </a>
      </button>
      <button className="text-white px-4 py-2 bg-hoverGreen hover:bg-defaultGreen">
        <a target="blank" href={yearlyLink || "#"}>
          Yearly 500₺ (2 Ay Ücretsiz)
        </a>
      </button>
    </div>
  );
};

export default Premium;
