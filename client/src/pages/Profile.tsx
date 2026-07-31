import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useTheme } from "../context/useTheme";
import useButtonNavigator from "../hooks/useButtonNavigator";
import { useMe } from "../hooks/useMe";
import { useTitle } from "../hooks/useTitle";
import {
  LaptopMinimalCheck,
  Rocket,
  SquareUser,
  ClockArrowUp,
  MapPin,
  Building2,
  Pencil,
  Flag,
  Link as LinkIcon,
} from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { UserRoundPen } from "lucide-react";
import WpmBarChart from "../components/WpmBarChart";
import { useUserTests } from "../hooks/useUserTestsData";
import type { userTestsData } from "../types/userTestsData";
import Loader from "../components/Loader";
import useMinimumLoader from "../hooks/useMinimumLoader";
import AccuracyBarChart from "../components/AccuracyBarChart";
import AverageAccuracyScatterChart from "../components/AverageAccuracyScatterChart";
import AverageWpmScatterChart from "../components/AverageWpmScatterChart";
import { useEffect, useMemo, useState } from "react";
import { ActivityCalendar } from "react-activity-calendar";
import "../styles/profileHeatMap.css";

interface ScatterPoint {
  x: number;
  y: number;
  date: string;
}
interface ActivityData {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

const Profile = () => {
  const { isDark } = useTheme();
  useTitle("Profile");
  useButtonNavigator({ targetKey: "Escape", targetPath: "/typingtest" });
  const { data: user, isLoading } = useMe();
  const { data: tests } = useUserTests(user?.id);
  console.log(tests);
  const showPageLoader = useMinimumLoader(isLoading);
  const navigate = useNavigate();

  const [selectedGraph1, setSelectedGraph1] = useState<"wpm" | "accuracy">("wpm");
  const [selectedGraph2, setSelectedGraph2] = useState<"wpm" | "accuracy">("wpm");

  const getWpmDistribution = (tests: userTestsData[]) => {
    if (!tests.length) return [];
    const maxWpm = Math.max(...tests.map((test) => test.wpm));
    const bucketCount = Math.floor(maxWpm / 10) + 1;
    const ranges = Array(bucketCount).fill(0);
    tests.forEach((test) => {
      const index = Math.floor(test.wpm / 10);
      ranges[index]++;
    });
    return ranges.map((wpmCount, index) => ({
      range: `${index * 10}-${index * 10 + 9}`,
      wpmCount,
    }));
  };
  const wpmDistributionArray = tests ? getWpmDistribution(tests) : [];

  const getAccuracyDistribution = (tests: userTestsData[]) => {
    const buckets = [
      { min: 0, max: 9, label: "0-9" },
      { min: 10, max: 29, label: "10-29" },
      { min: 30, max: 49, label: "30-49" },
      { min: 50, max: 69, label: "50-69" },
      { min: 70, max: 79, label: "70-79" },
      { min: 80, max: 84, label: "80-84" },
      { min: 85, max: 89, label: "85-89" },
      { min: 90, max: 91, label: "90-91" },
      { min: 92, max: 93, label: "92-93" },
      { min: 94, max: 95, label: "94-95" },
      { min: 96, max: 97, label: "96-97" },
      { min: 98, max: 99, label: "98-99" },
      { min: 100, max: 100, label: "100" },
    ];

    const distribution = buckets.map((bucket) => ({
      range: bucket.label,
      accuracyCount: 0,
      rawAccuracyCount: 0,
    }));

    tests.forEach((test) => {
      const accuracy = Math.round(test.accuracy);
      const rawAccuracy = Math.round(test.raw_accuracy);

      const accuracyIndex = buckets.findIndex(
        (bucket) => accuracy >= bucket.min && accuracy <= bucket.max,
      );
      if (accuracyIndex !== -1) {
        distribution[accuracyIndex].accuracyCount++;
      }

      const rawAccuracyIndex = buckets.findIndex(
        (bucket) => rawAccuracy >= bucket.min && rawAccuracy <= bucket.max,
      );
      if (rawAccuracyIndex !== -1) {
        distribution[rawAccuracyIndex].rawAccuracyCount++;
      }
    });

    return distribution;
  };
  const accuracyDistributionArray = tests
    ? getAccuracyDistribution(tests)
    : [];

  const getAverageWpmScatterData = (tests: userTestsData[]): ScatterPoint[] => {
    if (!tests.length) return [];

    const grouped = new Map<
      string,
      {
        total: number;
        count: number;
        date: Date;
      }
    >();

    tests.forEach((test) => {
      const date = new Date(test.created_at);

      const key = date.toISOString().split("T")[0];

      if (!grouped.has(key)) {
        grouped.set(key, {
          total: 0,
          count: 0,
          date,
        });
      }

      const current = grouped.get(key)!;
      current.total += test.wpm;
      current.count++;
    });
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return [...grouped.values()]
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .map((item, index) => ({
        x: index + 1,
        y: +(item.total / item.count).toFixed(1),
        date: `${item.date.getUTCDate()} ${
          months[item.date.getUTCMonth()]
        } ${item.date.getUTCFullYear()}`,
      }));
  };
  const wpmScatterDataArray = tests ? getAverageWpmScatterData(tests) : [];

  const getAverageAccuracyScatterData = (
    tests: userTestsData[],
  ): ScatterPoint[] => {
    if (!tests.length) return [];

    const grouped = new Map<
      string,
      {
        total: number;
        count: number;
        date: Date;
      }
    >();

    tests.forEach((test) => {
      const date = new Date(test.created_at);

      const key = date.toISOString().split("T")[0];

      if (!grouped.has(key)) {
        grouped.set(key, {
          total: 0,
          count: 0,
          date,
        });
      }

      const current = grouped.get(key)!;
      current.total += test.accuracy;
      current.count++;
    });
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return [...grouped.values()]
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .map((item, index) => ({
        x: index + 1,
        y: +(item.total / item.count).toFixed(1),
        date: `${item.date.getUTCDate()} ${
          months[item.date.getUTCMonth()]
        } ${item.date.getUTCFullYear()}`,
      }));
  };
  const accuracyScatterDataArray = tests
    ? getAverageAccuracyScatterData(tests)
    : [];

  const getActivityCalendarData = (tests: userTestsData[]): ActivityData[] => {
    const activityMap = new Map<string, number>();

    tests.forEach((test) => {
      const date = new Date(test.created_at).toISOString().split("T")[0];

      activityMap.set(date, (activityMap.get(date) ?? 0) + 1);
    });

    const today = new Date();
    const start = new Date(today);
    start.setUTCDate(today.getUTCDate() - 364);

    const activity: ActivityData[] = [];

    for (
      let date = new Date(start);
      date <= today;
      date.setUTCDate(date.getUTCDate() + 1)
    ) {
      const key = date.toISOString().split("T")[0];
      const count = activityMap.get(key) ?? 0;

      let level: 0 | 1 | 2 | 3 | 4 = 0;

      if (count === 0) {
        level = 0;
      } else if (count <= 3) {
        level = 1;
      } else if (count <= 6) {
        level = 2;
      } else if (count <= 9) {
        level = 3;
      } else {
        level = 4;
      }

      activity.push({
        date: key,
        count,
        level,
      });
    }

    return activity;
  };
  const activityCalendarData = tests ? getActivityCalendarData(tests) : [];

  const analytics = useMemo(() => {
    if (!tests || tests.length === 0) return [];
    const sortedTests = [...tests].sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
    const recentTests = sortedTests.slice(0, 15);
    return [
      {
        label: "Highest WPM",
        value: Math.max(...tests.map((t) => t.wpm)),
      },
      {
        label: "Average WPM",
        value: Math.round(
          tests.reduce((sum, t) => sum + t.wpm, 0) / tests.length,
        ),
      },
      {
        label: "Average WPM (Last 15 Tests)",
        value: Math.round(
          recentTests.reduce((sum, t) => sum + t.wpm, 0) / recentTests.length,
        ),
      },
      {
        label: "Highest Accuracy",
        value: `${Math.max(...tests.map((t) => t.accuracy))}%`,
      },
      {
        label: "Average Accuracy",
        value: `${(
          tests.reduce((sum, t) => sum + t.accuracy, 0) / tests.length
        ).toFixed(1)}%`,
      },
      {
        label: "Average Accuracy (Last 15 Tests)",
        value: `${(
          recentTests.reduce((sum, t) => sum + t.accuracy, 0) /
          recentTests.length
        ).toFixed(1)}%`,
      },
      {
        label: "Estimated Words Typed",
        value: Math.round(
          tests.reduce((sum, t) => sum + t.correct_chars, 0) / 5,
        ),
      },
      {
        label: "Average Raw WPM",
        value: Math.round(
          tests.reduce(
            (sum, t) => sum + t.total_chars_typed / (5 * (t.test_time / 60)),
            0,
          ) / tests.length,
        ),
      },
      {
        label: "Average Raw Accuracy",
        value: `${(
          tests.reduce((sum, t) => sum + t.raw_accuracy, 0) / tests.length
        ).toFixed(1)}%`,
      },
    ];
  }, [tests]);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    }
  }, [isLoading, user, navigate]);

  if (!isLoading && !user) return null;

  const formatDate = (date: string) => {
    const d = new Date(date);
    const day = d.getDate();

    const suffix =
      day % 100 >= 11 && day % 100 <= 13
        ? "th"
        : ["th", "st", "nd", "rd"][day % 10] || "th";

    return `${day}${suffix} ${d.toLocaleString("default", {
      month: "long",
    })}, ${d.getFullYear()}`;
  };

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return [hours, minutes, seconds]
      .map((unit) => unit.toString().padStart(2, "0"))
      .join(":");
  };

  const formatUrl = (
    url: string | null | undefined,
    type: "portfolio" | "github" | "linkedin" | "x",
  ) => {
    if (!url) return "";

    try {
      const { hostname, pathname } = new URL(url);

      switch (type) {
        case "portfolio":
          return hostname.replace(/^www\./, "");

        case "github":
        case "x": {
          const username = pathname.split("/").filter(Boolean)[0];
          return username ? `${username}` : hostname;
        }

        case "linkedin": {
          const username = pathname.split("/").filter(Boolean).pop();
          return username ? username : hostname;
        }
      }
    } catch {
      return url;
    }
  };

  return (
    <div
      data-theme={isDark ? "dark" : ""}
      className="font-poppins min-h-[110vh] h-fit bg-bgcolor text-textcolor"
    >
      <Navbar />
      {showPageLoader ? (
        <div className="text-[20px] h-[70vh] w-full flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="flex gap-x-5 min-h-screen h-fit px-30 pb-30">
          {/*Left Div*/}
          <div className="flex-[2.5] min-h-screen h-fit">
            <div className="h-fit w-fit flex gap-x-3 items-center">
              <SquareUser size={120} strokeWidth={1} />
              <div className="flex flex-col gap-y-1 w-full h-fit">
                <p className="text-[16px]">{user.name}</p>
                <p className="text-[14px] text-textcolorless">Blank Username</p>
                <p className="text-[14px]">
                  Rank <span>Blank Rank</span>
                </p>
              </div>
            </div>
            <div className="h-fit w-full flex items-center gap-x-3 mb-5">
              <p className="w-fit text-color1 font-semibold text-[16px]">
                {user.level}
              </p>
              <div className="w-full h-2 bg-lightgray rounded-full">
                <div className="w-[80%] h-2 bg-gray rounded-full"></div>
              </div>
              <p className="w-fit text-textcolorless">
                <span className="font-semibold">{user.xp}</span>/2300
              </p>
            </div>
            <div className="h-fit w-full mb-5">
              <p className="text-[15px]">{user.bio}</p>
            </div>
            <div
              className={`h-fit w-full ${user.keyboard ? "mb-1" : "mb-5"} flex gap-x-3 items-center`}
            >
              <p className="text-[16px] font-semibold text-textcolorless/50">
                Joined
              </p>
              <p className="text-[15px]">{formatDate(user.created_at)}</p>
            </div>
            {user.keyboard && (
              <div className="h-fit w-full mb-5 flex gap-x-3 items-center">
                <p className="text-[16px] font-semibold text-textcolorless/50">
                  Keyboard
                </p>
                <p className="text-[15px]">{user.keyboard}</p>
              </div>
            )}
            <div className="mb-5 w-full h-fit select-none">
              <Link
                to="/edit"
                className="rounded-md text-[16px] border-2 border-color1 h-10 w-full flex justify-center items-center gap-x-1"
              >
                <span className="text-color1 font-medium text-[15px]">
                  Edit Profile
                </span>
                <UserRoundPen className="text-color1" size={15} />
              </Link>
            </div>
            <div className="h-fit w-full flex flex-col gap-y-[8px] mb-5">
              <p className="text-[17px] font-semibold mb-1">Overall Stats</p>
              <div className="w-fit flex items-center">
                <Rocket
                  size={18}
                  strokeWidth={2}
                  className="text-pink-500 mr-2"
                />
                <p className="text-[14.5px] text-textcolorless/70 mr-5">
                  Test Started
                </p>
                <p className="text-[16px]">{user.test_started}</p>
              </div>
              <div className="w-fit flex items-center">
                <LaptopMinimalCheck
                  size={18}
                  strokeWidth={2}
                  className="text-emerald-500 mr-2"
                />
                <p className="text-[14.5px] text-textcolorless/70 mr-5">
                  Test Completed
                </p>
                <p className="text-[16px]">{user.test_completed}</p>
              </div>
              <div className="w-fit flex items-center">
                <ClockArrowUp
                  size={18}
                  strokeWidth={2}
                  className="text-yellow-500 mr-2"
                />
                <p className="text-[14.5px] text-textcolorless/70 mr-5">
                  Time Typing
                </p>
                <p className="text-[16px]">{formatTime(user.time_typing)}</p>
              </div>
              <div className="w-fit flex items-center">
                <Pencil
                  size={18}
                  strokeWidth={2}
                  className="text-blue-500 mr-2"
                />
                <p className="text-[14.5px] text-textcolorless/70 mr-5">
                  Total Chars Typed
                </p>
                <p className="text-[16px]">{user.total_chars_typed}</p>
              </div>
              <div className="w-fit flex items-center">
                <Flag
                  size={18}
                  strokeWidth={2}
                  className="text-orange-500 mr-2"
                />
                <p className="text-[14.5px] text-textcolorless/70 mr-5">
                  Longest Streak
                </p>
                <p className="text-[16px]">{user.longest_streak}</p>
              </div>
            </div>
            {(user.city || user.country || user.organization) && (
              <div className="h-fit w-full flex flex-col gap-y-[8px] mb-5">
                <p className="text-[17px] font-semibold mb-1">
                  Personal Details
                </p>
                {(user.city || user.country) && (
                  <div className="w-fit flex items-center">
                    <MapPin
                      size={18}
                      strokeWidth={2}
                      className="text-textcolorless/60 mr-2"
                    />
                    <p className="text-[14.5px] mr-5 text-textcolorless/80">
                      <span>{user.city}</span>
                      <span>, </span>
                      <span>{user.country}</span>
                    </p>
                  </div>
                )}
                {user.organization && (
                  <div className="w-fit flex items-center">
                    <Building2
                      size={18}
                      strokeWidth={2}
                      className="text-textcolorless/60 mr-2"
                    />
                    <p className="text-[14.5px] mr-5 text-textcolorless/80">
                      {user.organization}
                    </p>
                  </div>
                )}
              </div>
            )}
            {(user.portfolio_url ||
              user.linkedin_url ||
              user.github_url ||
              user.x_url) && (
              <div className="h-fit w-full flex flex-col gap-y-[8px] mb-5">
                <p className="text-[17px] font-semibold mb-1">Socials</p>
                {user.portfolio_url && (
                  <a
                    href={user.portfolio_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-fit flex items-center"
                  >
                    <LinkIcon
                      size={17}
                      strokeWidth={3}
                      className="text-textcolorless/60 mr-2 group-hover:text-textcolor"
                    />
                    <div className="text-[14.5px] mr-5 text-textcolorless/80 group-hover:text-textcolorless">
                      {formatUrl(user.portfolio_url, "portfolio")}
                    </div>
                  </a>
                )}
                {user.linkedin_url && (
                  <a
                    href={user.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-fit flex items-center"
                  >
                    <FaLinkedinIn
                      size={16}
                      strokeWidth={2}
                      className="text-textcolorless/60 mr-2 group-hover:text-textcolor"
                    />
                    <div className="text-[14.5px] mr-5 text-textcolorless/80 group-hover:text-textcolorless">
                      {formatUrl(user.linkedin_url, "linkedin")}
                    </div>
                  </a>
                )}
                {user.github_url && (
                  <a
                    href={user.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-fit flex items-center"
                  >
                    <IoLogoGithub
                      size={16}
                      strokeWidth={2}
                      className="text-textcolorless/60 mr-2 group-hover:text-textcolor"
                    />
                    <div className="text-[14.5px] mr-5 text-textcolorless/80 group-hover:text-textcolorless">
                      {formatUrl(user.github_url, "github")}
                    </div>
                  </a>
                )}
                {user.x_url && (
                  <a
                    href={user.x_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-fit flex items-center"
                  >
                    <FaXTwitter
                      size={16}
                      strokeWidth={2}
                      className="text-textcolorless/60 mr-2 group-hover:text-textcolor"
                    />
                    <div className="text-[14.5px] mr-5 text-textcolorless/80 group-hover:text-textcolorless">
                      {formatUrl(user.x_url, "x")}
                    </div>
                  </a>
                )}
              </div>
            )}
          </div>
          {/*Right Div*/}
          <div className="flex-[7.5] min-h-screen h-fit rounded-xl p-5 flex flex-col gap-y-5 border-1 border-bordercolor">
            <div className="h-fit w-full flex flex-col">
              <h3 className="text-[15px] font-medium bg-bgcolorless w-fit py-2 px-6 rounded-lg rounded-bl-[0px] rounded-br-[0px] shadow-[0_8px_16px_-4px_rgba(0,0,0,0.2)] border-1 border-gray/50 border-b-0">
                Activity Calendar
              </h3>
              <div className="min-h-[25vh] h-fit w-full flex justify-center items-center rounded-lg rounded-tl-[0px] shadow-[0_8px_16px_-4px_rgba(0,0,0,0.2)] border-1 border-gray/50 bg-bgcolorless">
                {activityCalendarData.length === 0 ? (
                  <p className="text-[16px] text-textcolorless/70">
                    No tests taken yet.
                  </p>
                ) : (
                  <ActivityCalendar
                    data={activityCalendarData}
                    blockSize={12}
                    blockMargin={4}
                    blockRadius={3}
                    fontSize={13}
                    showWeekdayLabels={["sun", "tue", "thu", "sat"]}
                    tooltips={{
                      activity: {
                        text: ({ date }) => {
                          const count =
                            activityCalendarData.find(
                              (item) => item.date === date,
                            )?.count ?? 0;

                          return `${count} activities on ${formatDate(
                            new Date(date).toLocaleDateString("en-US"),
                          )}`;
                        },
                        placement: "top",
                        offset: 6,
                        hoverRestMs: 100,
                        transitionStyles: {
                          duration: 500,
                        },
                      },
                    }}
                    theme={{
                      light: isDark
                        ? [
                            "#363636", // dark
                            "#5E0472",
                            "#82059E",
                            "#B306DA",
                            "#D53FF8",
                          ]
                        : [
                            "#D9D9D9", // light
                            "#F0BAFD",
                            "#E380F9",
                            "#CB09F6",
                            "#A607CA",
                          ],
                      dark: isDark
                        ? [
                            "#363636", // dark
                            "#5E0472",
                            "#82059E",
                            "#B306DA",
                            "#D53FF8",
                          ]
                        : [
                            "#D9D9D9", // light
                            "#F0BAFD",
                            "#E380F9",
                            "#CB09F6",
                            "#A607CA",
                          ],
                    }}
                  />
                )}
              </div>
            </div>
            <div className="h-fit w-full flex flex-col gap-y-2">
              <div className="flex flex-wrap gap-x-1 w-fit rounded-lg bg-bgcolor border-1 border-gray/50 p-1">
                <button
                  onClick={() => setSelectedGraph2("wpm")}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium focus:outline-none ${
                    selectedGraph2 === "wpm"
                      ? "bg-color1 text-white shadow"
                      : "text-textcolorless hover:bg-bgcolorless"
                  }`}
                >
                  WPM Distribution
                </button>

                <button
                  onClick={() => setSelectedGraph2("accuracy")}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium focus:outline-none ${
                    selectedGraph2 === "accuracy"
                      ? "bg-color1 text-white shadow"
                      : "text-textcolorless hover:bg-bgcolorless"
                  }`}
                >
                  Accuracy Distribution
                </button>
              </div>
              <div className="h-fit w-full flex justify-center items-center">
                {selectedGraph2 === "wpm" ? (
                  wpmDistributionArray.length === 0 ? (
                    <p className="text-[16px] text-textcolorless/70">
                      No tests taken yet.
                    </p>
                  ) : (
                    <WpmBarChart data={wpmDistributionArray} />
                  )
                ) : accuracyDistributionArray.length === 0 ? (
                  <p className="text-[16px] text-textcolorless/70">
                    No tests taken yet.
                  </p>
                ) : (
                  <AccuracyBarChart data={accuracyDistributionArray} />
                )}
              </div>
            </div>
            <div className="h-fit w-full flex flex-col gap-y-2">
              <div className="flex flex-wrap gap-x-1 w-fit rounded-lg bg-bgcolor border-1 border-gray/50 p-1">
                <button
                  onClick={() => setSelectedGraph1("wpm")}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium focus:outline-none ${
                    selectedGraph1 === "wpm"
                      ? "bg-color1 text-white shadow"
                      : "text-textcolorless hover:bg-bgcolorless"
                  }`}
                >
                  Average WPM
                </button>

                <button
                  onClick={() => setSelectedGraph1("accuracy")}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium focus:outline-none ${
                    selectedGraph1 === "accuracy"
                      ? "bg-color1 text-white shadow"
                      : "text-textcolorless hover:bg-bgcolorless"
                  }`}
                >
                  Average Accuracy
                </button>
              </div>

              <div className="h-fit w-full flex justify-center items-center">
                {selectedGraph1 === "wpm" ? (
                  wpmScatterDataArray.length === 0 ? (
                    <p className="text-[16px] text-textcolorless/70">
                      No tests taken yet.
                    </p>
                  ) : (
                    <AverageWpmScatterChart data={wpmScatterDataArray} />
                  )
                ) : accuracyScatterDataArray.length === 0 ? (
                  <p className="text-[16px] text-textcolorless/70">
                    No tests taken yet.
                  </p>
                ) : (
                  <AverageAccuracyScatterChart
                    data={accuracyScatterDataArray}
                  />
                )}
              </div>
            </div>
            <div className="h-fit w-full flex flex-col">
              <h3 className="text-[15px] font-medium bg-bgcolorless w-fit py-2 px-6 rounded-lg rounded-bl-[0px] rounded-br-[0px] shadow-[0_8px_16px_-4px_rgba(0,0,0,0.2)] border-1 border-gray/50 border-b-0">
                Analytics
              </h3>
              <div className="h-fit w-full flex justify-center items-center bg-bgcolorless shadow-[0_8px_16px_-4px_rgba(0,0,0,0.2)] border-1 border-gray/50 p-3 rounded-lg rounded-tl-[0px]">
                {analytics.length === 0 ? (
                  <p className="text-[16px] text-textcolorless/70">
                    No tests taken yet.
                  </p>
                ) : (
                  <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {analytics.map((stat) => (
                      <div
                        key={stat.label}
                        className="bg-bgcolorless p-4 border-1 border-bgcolorless"
                      >
                        <p className="text-sm text-textcolorless/70">
                          {stat.label}
                        </p>
                        <p className="mt-2 text-2xl font-semibold text-textcolor">
                          {stat.value}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
