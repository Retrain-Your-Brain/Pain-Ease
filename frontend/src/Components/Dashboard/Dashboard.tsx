import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStethoscope } from "@fortawesome/free-solid-svg-icons";
import {
  faBrain,
  faHeartbeat,
  faChartLine,
  faUsers,
  faPeopleGroup,
  faChartSimple,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useNavigate } from "react-router-dom";
library.add(faBrain, faHeartbeat, faChartLine, faUsers);

export default function Dashboard() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/register");
  };
  return (
    <div className="absolute w-full top-0  left-0 max-h gap-x-10 h-auto">
      <div className="top-0 w-full bg-gradient-to-b from-purple-300 via-violet-200 to-white-100  flex justify-between items-center px-20 py-10 h-120">
        <div className="w-1/2 mt-40 ">
          <h1 className="text-5xl text-blue-900 font-bold text-left ">All - In - One </h1>
          <h1 className="text-5xl text-blue-900 font-bold text-left mt-4">Chronic Pain Solution</h1>
          <p className=" mt-8 text-left text-xl font-poppins">
            PainEase empowers chronic pain relief with personalized workouts, progress tracking, and support—all in one
            seamless, intelligent platform.
          </p>
          <button
            className=" bg-indigo-200 rounded-4xl w-60 text-center h-15 mt-12 text-xl text-blue-950 font-semibold mr-130 shadow-xl"
            onClick={handleClick}
          >
            Get Started
          </button>
        </div>

        <div className="mt-40">
          <img src="health.png" className="h-100 w-100" />
        </div>
      </div>

      <div className="bg-white py-16 text-center">
        <h1 className="text-3xl font-extrabold text-blue-900 mb-4">Inspired by Innovation. Built to Empower You.</h1>
        <p className="text-gray-600 text-lg mb-10">
          We combine intelligent planning, progress tracking, and supportive tools to guide your wellness journey.
        </p>

        <div className="flex justify-center gap-12">
          <div className="flex flex-col items-center w-40">
            <FontAwesomeIcon icon="brain" size="3x" className="text-indigo-600 mb-3" />
            <p className="font-semibold text-sm text-gray-700">AI-Driven Insights</p>
          </div>
          <div className="flex flex-col items-center w-40">
            <FontAwesomeIcon icon="heartbeat" size="3x" className="text-pink-600 mb-3" />
            <p className="font-semibold text-sm text-gray-700">Wellness Focus</p>
          </div>
          <div className="flex flex-col items-center w-40">
            <FontAwesomeIcon icon="chart-line" size="3x" className="text-green-600 mb-3" />
            <p className="font-semibold text-sm text-gray-700">Progress Tracking</p>
          </div>
          <div className="flex flex-col items-center w-40">
            <FontAwesomeIcon icon="users" size="3x" className="text-yellow-500 mb-3" />
            <p className="font-semibold text-sm text-gray-700">Community Support</p>
          </div>
        </div>
      </div>

      <div className=" bg-neutral-50 w-full h-120 mb-20">
        <h1 className="text-3xl font-semibold p-6 ">Provide High Quality Health Care</h1>

        <div className="flex justify-evenly mt-10 ">
          <div className="shadow bg-white h-70 w-100  ">
            <FontAwesomeIcon icon={faStethoscope} size="3x" className="text-blue-900 mt-7 h-20" />
            <h1 className="mt-8 font-semibold text-blue-900">Provide Personalized Chronic Pain Relief</h1>
            <p className="text-gray-600 mt-3">
              PainEase is a smart, user-friendly platform that helps you manage chronic pain with personalized workouts,
              progress tracking, and supportive tools — all in one place.
            </p>
          </div>
          <div className="shadow bg-white h-70 w-100  ">
            <FontAwesomeIcon icon={faPeopleGroup} size="3x" className="text-blue-900 mt-7 h-20" />
            <h1 className="mt-8 font-semibold text-blue-900"> Stay Motivated with Community </h1>
            <p className="text-gray-600  mt-3">
              Combat isolation and burnout by engaging with a supportive community. Connect with peers, celebrate
              milestones, and stay accountable — together.
            </p>
          </div>

          <div className="shadow bg-white h-70 w-100  ">
            <FontAwesomeIcon icon={faChartSimple} size="3x" className="text-blue-900 mt-7 h-20" />
            <h1 className="mt-8 font-semibold text-blue-900"> Make Informed Wellness Decisions</h1>
            <p className="text-gray-600  mt-3">
              From smart workout scheduling to real-time progress tracking, PainEase simplifies your day-to-day health
              routines so you can focus on healing and growth.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-start px-20 pb-10">
        {/* Left Feature Column */}
        <div className="w-1/2 space-y-10">
          <h1 className="text-4xl font-extrabold text-blue-900 mb-10 ">Essential Wellness Tools Designed for You</h1>

          {/* Feature 1 */}
          <div className="flex items-start space-x-4">
            <span className="text-green-600 text-2xl">✔️</span>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Smart Scheduling</h2>
              <p className="text-gray-600">
                Effortlessly plan your personalized workout routines with drag-and-drop ease to stay consistent and
                avoid burnout.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-start space-x-4">
            <span className="text-green-600 text-2xl">✔️</span>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Mobile App for Daily Ease</h2>
              <p className="text-gray-600">
                Track workouts, log pain levels, and receive reminders—all from the PainEase app, anywhere you go.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-start space-x-4">
            <span className="text-green-600 text-2xl">✔️</span>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Custom Exercise & Pain Forms</h2>
              <p className="text-gray-600">
                Personalize wellness tracking forms with templates or custom fields—synced automatically and
                privacy-controlled.
              </p>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-1/2 flex justify-center">
          <img src="laptop.png" alt="Reminder Feature Screenshot" className="max-w-full h-100 rounded-xl mt-20 ml-20" />
        </div>
      </div>

      <div className="flex justify-between items-start px-20 pb-10">
        <div className="w-1/2 flex justify-center">
          <img
            src="phone.png"
            alt="Reminder Feature Screenshot"
            className="max-w-full h-auto rounded-xl mt-20 mr-20 "
          />
        </div>

        {/* Left Feature Column */}
        <div className="w-1/2 space-y-10">
          {/* Feature 1 */}
          <div className="flex items-start space-x-4 mt-14 ">
            <span className="text-green-600 text-2xl">✔️</span>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Progress Verification</h2>
              <p className="text-gray-600">
                Log every step of your journey—automatically track your sessions, completion time, progress milestones,
                and physical feedback with our intelligent verification tools.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-start space-x-4">
            <span className="text-green-600 text-2xl">✔️</span>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Seamless Rewards & Progress Milestones</h2>
              <p className="text-gray-600">
                {" "}
                Get rewarded for consistency! From unlocking achievements to personalized suggestions, our system keeps
                you motivated and engaged every step of the way.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-start space-x-4">
            <span className="text-green-600 text-2xl">✔️</span>
            <div>
              <h2 className="text-xl font-semibold text-gray-800"> Data Privacy & Security</h2>
              <p className="text-gray-600">
                Your health data is safe with us. We ensure end-to-end encryption, secure authentication, cloud backups,
                and full compliance with industry-standard privacy protocols.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
