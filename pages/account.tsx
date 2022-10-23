import { updateEmail, updatePassword, updateProfile } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { isPlanState } from "../atoms/planAtom";
import Header from "../components/Header";
import Helmet from "../components/Helmet";
import {
  LOCAL_STORAGE_PLAN_KEY,
  LOCAL_STORAGE_SUBSCRIBE_TIME_KEY,
  products,
} from "../constants";
import { auth } from "../firebase";
import { Product } from "../types";

const Account = () => {
  const subscribeAt = localStorage.getItem(LOCAL_STORAGE_SUBSCRIBE_TIME_KEY);
  const plan = localStorage.getItem(LOCAL_STORAGE_PLAN_KEY);
  const user = auth.currentUser;
  const [isUpdateEmail, setIsUpdateEmail] = useState<Boolean>(false);
  const [isUpdatePassword, setIsUpdatePassword] = useState<Boolean>(false);
  const [isUpdateProfile, setIsUpdateProfile] = useState<Boolean>(false);
  const [product, setProduct] = useState<Product>();
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [newPassword, setNewPassword] = useState("************");

  const [_, setIsPlan] = useRecoilState(isPlanState);

  const router = useRouter();

  if (!user) return null;

  useEffect(() => {
    products
      .filter((product) => product.name.toLowerCase() === plan?.toLowerCase())
      .map((product) => setProduct(product));
  }, []);

  const handleUpdateEmail = async () => {
    await updateEmail(user, email)
      .then(() => alert("Email updated"))
      .catch((error) => alert(error.message));

    setIsUpdateEmail(false);
  };
  const handleUpdatePassword = async () => {
    await updatePassword(user, newPassword)
      .then(() => alert("Password updated"))
      .catch((error) => alert(error.message));

    setIsUpdatePassword(false);
  };
  const handleUpdateProfile = async () => {
    await updateProfile(user, {
      displayName,
    })
      .then(() => alert("Profile updated!"))
      .catch((error) => alert(error.message));

    setIsUpdateProfile(false);
  };

  const handleUnsubscribe = () => {
    setIsPlan(false);

    router.push("/");

    localStorage.removeItem(LOCAL_STORAGE_PLAN_KEY);
    localStorage.removeItem(LOCAL_STORAGE_SUBSCRIBE_TIME_KEY);
  };

  console.log(user);

  return (
    <div>
      <Helmet title="Account Setting" />

      <Header />

      <main className="pt-24 divide-y divide-[gray] space-y-6 px-6 mb-20">
        <div className="md:flex md:items-center space-y-2 md:space-x-4">
          <h1 className="text-3xl md:text-4xl font-semibold">Account</h1>
          <div className="flex items-center gap-1.5">
            <Image
              src="https://rb.gy/4vfk4r"
              alt="subscribe-time-icon"
              width={24}
              height={24}
            />
            <p className="text-xs font-semibold text-[#555]">
              {subscribeAt
                ? `Member since ${subscribeAt} - Your membership will end in the next 30 days`
                : "Not a member."}
            </p>
          </div>
        </div>

        <div className="pt-4">
          <h3 className="mb-4 text-xl font-medium">Membership</h3>

          <div className="planInfo">
            {user && (
              <div>
                <div className="flex items-center justify-center mb-4">
                  <Image
                    src={
                      user?.photoURL
                        ? user?.photoURL
                        : "https://i.pravatar.cc/300"
                    }
                    width={120}
                    height={120}
                    className="rounded-full"
                  />
                </div>

                {/* Email */}
                <div>
                  <div>
                    <span>Email: </span>
                    {isUpdateEmail ? (
                      <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    ) : (
                      <p>
                        {user?.email
                          ? user?.email
                          : "Email has not been updated."}
                      </p>
                    )}
                  </div>

                  <p>
                    {isUpdateEmail && (
                      <button onClick={handleUpdateEmail}>Update</button>
                    )}
                    <span onClick={() => setIsUpdateEmail(!isUpdateEmail)}>
                      {isUpdateEmail ? "Cancel" : "Change email"}
                    </span>
                  </p>
                </div>

                {/* Password */}
                <div>
                  <div>
                    <span>Password: </span>
                    {isUpdatePassword ? (
                      <input
                        type="password"
                        name="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    ) : (
                      <p>************</p>
                    )}
                  </div>

                  <p>
                    {isUpdatePassword && (
                      <button onClick={handleUpdatePassword}>Update</button>
                    )}
                    <span
                      onClick={() => setIsUpdatePassword(!isUpdatePassword)}
                    >
                      {isUpdatePassword ? "Cancel" : "Change password"}
                    </span>
                  </p>
                </div>

                {/* Display name */}
                <div>
                  <div>
                    <span>Display name: </span>
                    {isUpdateProfile ? (
                      <input
                        type="text"
                        name="displayName"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                      />
                    ) : (
                      <p>
                        {user?.displayName
                          ? user?.displayName
                          : "Display name has not been updated."}
                      </p>
                    )}
                  </div>

                  <p>
                    {isUpdateProfile && (
                      <button onClick={handleUpdateProfile}>Update</button>
                    )}
                    <span onClick={() => setIsUpdateProfile(!isUpdateProfile)}>
                      {isUpdateProfile ? "Cancel" : "Change display name"}
                    </span>
                  </p>
                </div>

                {/* Phone number */}
                <div>
                  <div>
                    <span>Phone number: </span>
                    <p>
                      {user?.phoneNumber
                        ? user?.phoneNumber
                        : "Phone has not been updated."}
                    </p>
                  </div>

                  <p>
                    <span>Change phone number</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="pt-4">
          <h3 className="mb-4 text-xl font-medium">Plan Details</h3>

          <div className="w-full md:w-2/5 mx-auto">
            {plan ? (
              <div className="text-center space-y-2">
                <p className="flex items-center justify-between">
                  <span className="text-left text-lg text-[#e50914]">
                    {product?.name}
                  </span>
                  <button
                    className="text-blue-500 text-xs transition hover:underline hover:text-blue-700 text-end block italic mt-4"
                    onClick={handleUnsubscribe}
                  >
                    Unsubscribe
                  </button>
                </p>
                <p>
                  Video quality:{" "}
                  <span className="opacity-70">{product?.videoQuality}</span>
                </p>
                <p>
                  Resolution:{" "}
                  <span className="opacity-70">{product?.resolution}</span>
                </p>
                <p>
                  Ads:{" "}
                  <span className="opacity-70">
                    {product?.ads ? "Yes" : "No"}
                  </span>
                </p>
                <p>
                  Portability:{" "}
                  <span className="opacity-70">
                    {product?.portability ? "Yes" : "No"}
                  </span>
                </p>
                <p>
                  Ultra HD:{" "}
                  <span className="opacity-70">
                    {product?.ultraHD ? "Yes" : "No"}
                  </span>
                </p>
              </div>
            ) : (
              <p>
                You are not a member. Subscribe to thousands of TV shows and
                movies. Waiting about 2s to redirect to plan page.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Account;
