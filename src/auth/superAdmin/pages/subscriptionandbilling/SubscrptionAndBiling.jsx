import { useState, useEffect } from "react";
import { X, ChevronUp, ChevronDown } from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import toast from "react-hot-toast";
import { Icon, PricingIcon } from "../../../../assets";

const SubscrptionAndBiling = () => {
  const [plans, setPlans] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [billingType, setBillingType] = useState("monthly"); // "monthly" | "yearly"

  // ✅ Get Token (session OR local)
  const getToken = () => {
    return (
      sessionStorage.getItem("superAdminAccessToken") ||
      localStorage.getItem("superAdminAccessToken")
    );
  };

  // ✅ API CALL
  const getSubscriptions = async () => {
    const token = getToken();

    if (!token) {
      throw new Error("No token found");
    }

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/heartsy/api/v1/subscription/all`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch subscriptions");
    }

    return data.data;
  };

  // ✅ FETCH ON LOAD
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const res = await getSubscriptions();

        const formattedPlans = res
          .slice() // avoid mutating original
          .reverse()
          .map((item) => ({
            id: item._id,
            title: item.stripeProductId.name,
            description: item.stripeProductId.description,
            priceMonthly: item.stripeProductId.monthly?.price || 0,
            priceYearly: item.stripeProductId.yearly?.price || null, // ✅ add this

            hasYearly: !!item.stripeProductId.yearly, // ✅ flag
            users: item.userAllowed || "Unlimited",
            trial: item.freeTrial || 0,
            contactUs: item.stripeProductId.monthly?.price === 0,
            icon:
              item.stripeProductId.name === "Pro"
                ? PricingIcon.Pro
                : item.stripeProductId.name === "Pro +"
                  ? PricingIcon.ProPlus
                  : PricingIcon.Enterprise,
          }));

        setPlans(formattedPlans);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  // ✅ OPEN MODAL WITH DATA
  const handleEditClick = (plan) => {
    setCurrentPlan({
      ...plan,
      description: plan.description || "",
      priceMonthly: plan.priceMonthly || 0,
      users: plan.users || 0,
      trial: plan.trial || 0,
    });
    setIsModalOpen(true);
  };

  // ✅ UPDATE LOCAL STATE
  const handleUpdate = () => {
    setPlans((prev) =>
      prev.map((p) => (p.id === currentPlan.id ? currentPlan : p))
    );
    setIsModalOpen(false);
    toast.success("Plan updated locally");
  };

  const cleanHTML = (html) => {
    return html.replace(/color:\s*#ffffff;?/gi, "");
  };

  //modal 

  const editor = useEditor({
  extensions: [StarterKit],
  content: currentPlan?.description || "",
  onUpdate: ({ editor }) => {
    setCurrentPlan((prev) => ({
      ...prev,
      description: editor.getHTML(),
    }));
  },
});

useEffect(() => {
  if (editor && currentPlan?.description) {
    editor.commands.setContent(currentPlan.description);
  }
}, [currentPlan, editor]);


  return (
    <div className="w-full p-2 relative">
      <div className="mb-4">
        <h2 className="text-xl text-gray-800">
          Available Subscription Plans
        </h2>
        <p className="text-[#6C6E7E]">Manage subscription plans</p>
      </div>

      {/* ✅ Loading */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-100 p-4 bg-sidebar shadow-sm animate-pulse"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 xl:w-8 xl:h-8 bg-gray-300 rounded-full"></div>
                  <div className="h-5 w-32 bg-gray-300 rounded"></div>
                </div>

                {/* Price */}
                <div className="text-center space-y-4 mt-4">
                  <div className="h-8 w-40 mx-auto bg-gray-300 rounded-lg"></div>

                  {/* Description */}
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-300 rounded w-full"></div>
                    <div className="h-3 bg-gray-300 rounded w-5/6 mx-auto"></div>
                    <div className="h-3 bg-gray-300 rounded w-4/6 mx-auto"></div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-6 space-y-2">
                <div className="flex gap-2 items-center justify-center mb-2">
                  <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                  <div className="h-4 w-24 bg-gray-300 rounded"></div>
                </div>

                <div className="h-10 w-full bg-gray-300 rounded-xl"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <div className="flex justify-center mb-6">
            <div className="flex items-center bg-gray-100 rounded-full p-1">
              <button
                onClick={() => setBillingType("monthly")}
                className={`px-4 py-1 rounded-full text-sm ${billingType === "monthly"
                    ? "bg-white shadow text-primary"
                    : "text-gray-500"
                  }`}
              >
                Monthly
              </button>

              <button
                onClick={() => setBillingType("yearly")}
                className={`px-4 py-1 rounded-full text-sm ${billingType === "yearly"
                    ? "bg-white shadow text-primary"
                    : "text-gray-500"
                  }`}
              >
                Yearly
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="rounded-xl border border-gray-100 p-4 flex flex-col justify-between bg-sidebar shadow-sm"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src={plan.icon}
                      alt={plan.title}
                      className="w-6 h-6 xl:w-8 xl:h-8"
                    />
                    <h3 className="text-xl font-bold">{plan.title}</h3>
                  </div>

                  <div className="text-center space-y-4 mt-4">
                    <p className="text-primary font-bold text-lg border border-primary/20 bg-primary/5 rounded-lg">
                      {billingType === "yearly" && plan.hasYearly
                        ? `${Number(plan.priceYearly).toLocaleString()}/year`
                        : `${Number(plan.priceMonthly).toLocaleString()}/month`}

                      {" "}after {plan.trial}-day trial
                    </p>
                    <p
                      className="text-sm"
                      dangerouslySetInnerHTML={{
                        __html: cleanHTML(plan.description),
                      }}
                    />


                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <div className="flex gap-2 items-center justify-center mb-2">
                    <img
                      src={Icon.Peoples}
                      alt=""
                      className="w-5 h-5"
                    />
                    <p className="text-primary font-semibold">
                      {plan.users === "Unlimited"
                        ? "Unlimited users"
                        : `Up to ${plan.users} users`}
                    </p>
                  </div>

                  <button
                    onClick={() => handleEditClick(plan)}
                    className="w-full py-2 rounded-xl text-sm font-medium bg-primary text-white"
                  >
                    Edit Plan
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ✅ MODAL */}
      {isModalOpen && currentPlan && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40">
    <div className="bg-white w-full max-w-lg rounded-xl p-6">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Edit Plan</h2>
        <button onClick={() => setIsModalOpen(false)}>
          <X size={20} />
        </button>
      </div>

      <div className="space-y-5">

        {/* Name */}
        <div>
          <label className="text-sm font-medium mb-1 block">Plan Name</label>
          <input
            type="text"
            value={currentPlan.title}
            onChange={(e) =>
              setCurrentPlan({
                ...currentPlan,
                title: e.target.value,
              })
            }
            className="w-full border border-gray-200 p-2 rounded-md outline-none"
          />
        </div>

        {/* Pricing */}
        <div>
  <label className="text-sm font-medium mb-1 block">Pricing</label>
  <div className="grid grid-cols-2 gap-3">
    
    {/* Monthly Price */}
    <div className="relative">
      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500">$</span>
      <input
        type="number"
        placeholder="Monthly Price"
        value={currentPlan.priceMonthly}
        onChange={(e) =>
          setCurrentPlan({
            ...currentPlan,
            priceMonthly: e.target.value,
          })
        }
        className="w-full pl-6 border border-gray-200 p-2 rounded-md outline-none"
      />
    </div>

    {/* Yearly Price */}
    <div className="relative">
      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500">$</span>
      <input
        type="number"
        placeholder="Yearly Price"
        value={currentPlan.priceYearly || ""}
        onChange={(e) =>
          setCurrentPlan({
            ...currentPlan,
            priceYearly: e.target.value,
          })
        }
        className="w-full pl-6 border border-gray-200 p-2 rounded-md outline-none"
      />
    </div>

  </div>
</div>

        {/* Description (Tiptap) */}
        <div>
          <label className="text-sm font-medium mb-2 block">
            Description
          </label>

          {/* Toolbar */}
          {/* <div className="flex gap-2 mb-2">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className="px-2 py-1 text-sm border border-gray-200 rounded"
            >
              Bold
            </button>

            <button
              onClick={() =>
                editor.chain().focus().toggleBulletList().run()
              }
              className="px-2 py-1 text-sm border border-gray-200 rounded"
            >
              List
            </button>
          </div> */}

          {/* Editor */}
          <div className="border border-gray-200 rounded-md p-2 min-h-[120px]">
            <EditorContent editor={editor} />
          </div>
        </div>

        {/* Users */}
        <div>
          <label className="text-sm font-medium mb-1 block">Users</label>
          <input
            type="number"
            placeholder="Enter number or leave empty for Unlimited"
            value={currentPlan.users === "Unlimited" ? "" : currentPlan.users}
            onChange={(e) =>
              setCurrentPlan({
                ...currentPlan,
                users: e.target.value || "Unlimited",
              })
            }
            className="w-full border border-gray-200 p-2 rounded-md outline-none"
          />
          {currentPlan.users === "Unlimited" && (
            <p className="text-xs text-gray-400 mt-1">
              Unlimited users enabled
            </p>
          )}
        </div>

        {/* Trial */}
        <div>
          <label className="text-sm font-medium mb-1 block">
            Trial Days
          </label>
          <input
            type="number"
            value={currentPlan.trial}
            onChange={(e) =>
              setCurrentPlan({
                ...currentPlan,
                trial: Math.max(0, Number(e.target.value)),
              })
            }
            className="w-full border border-gray-200 p-2 rounded-md outline-none"
          />
        </div>
      </div>

      {/* Footer */}
      <button
        onClick={handleUpdate}
        className="w-full mt-6 py-3 bg-primary text-white rounded-md font-medium"
      >
        Update Plan
      </button>
    </div>
  </div>
)}
    </div>
  );
};

export default SubscrptionAndBiling;