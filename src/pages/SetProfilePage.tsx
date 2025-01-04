// @ts-nocheck

/* eslint-disable no-unsafe-optional-chaining */
import Button from "components/Button";
import TabBar from "components/TabBar";
import PageLayout from "layouts/PageLayout";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import AddEducation from "sections/SetProfilePage/AddEducation";
import AddExperience from "sections/SetProfilePage/AddExperience";
import AddService from "sections/SetProfilePage/AddService";

import OtherDetails from "sections/SetProfilePage/OtherDetails";
import SetProfile from "sections/SetProfilePage/SetProfile";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { twMerge } from "tailwind-merge";
import Typography from "components/Typography";
import axios from "axios";
import { BASE_URL } from "utils/constants";
import { AuthContext } from "Providers/AuthContextProvider";
import { ProfileDataContext } from "states/ProfileDataProvider";

const schema = yup.object({
  username: yup.string().required("Username is required"),
  title: yup.string().trim(),
  description: yup.string().trim(),
  // services: yup.object().shape({

  //   category: yup.array().of(
  //     yup.object().shape({
  //       code: yup.string().trim(),
  //       label: yup.string().trim(),
  //     })
  //   ),
  //   subCategory: yup.array().of(
  //     yup.object().shape({
  //       code: yup.string().trim(),
  //       label: yup.string().trim(),
  //     })
  //   ),
  // }),
  skills: yup.array().of(
    yup.object().shape({
      code: yup.string().trim(),
      label: yup.string().trim(),
    })
  ),
  education: yup.array().of(
    yup.object().shape({
      school: yup.string().required("School is Required"),
      degree: yup.string(),
      fieldOfStudy: yup.string(),
      currentlyStudyingHere: yup.bool().oneOf([true, false]),

      startMonth: yup
        .string()
        .required("Start month is required")
        .notOneOf(["", "month", "Month"], "please select month"),
      startYear: yup
        .string()
        .required("Start year is required")
        .notOneOf(["", "Year", "year"], "Year cannot be empty"),

      endMonth: yup
        .string()
        .default("")
        .when("currentlyStudyingHere", {
          is: false,
          then: () => yup.string().required("End month is required"),
          otherwise: () => yup.string().default(""),
        }),
      endYear: yup
        .string()
        .default("")
        .when("currentlyStudyingHere", {
          is: false,
          then: () => yup.string().required("End year is required"),
          otherwise: () => yup.string().default(""),
        }),
    })
  ),
  experience: yup.array().of(
    yup.object().shape({
      title: yup.string().required("Experience Title is Required"),
      companyName: yup.string().required("Company name is a required"),
      location: yup.string().required("Location is a required"),
      locationType: yup
        .string()
        .required("Location type is required")
        .notOneOf(["", "Please Select"], "please select location type"),
      employementType: yup
        .string()
        .required("Employment type is required")
        .notOneOf(["", "Please Select"], "please select employement tye"),

      currentlyWorkingHere: yup.bool().oneOf([true, false]),

      startDate: yup
        .string()
        .required("Start month is required")
        .notOneOf(["", "month", "Month"], "please select month"),
      startYear: yup
        .string()
        .required("Start year is required")
        .notOneOf(["", "Year", "year"], "Year cannot be empty"),

      endDate: yup
        .string()
        .default("")
        .when("currentlyWorkingHere", {
          is: false,
          then: () => yup.string().required("End month is required"),
          otherwise: () => yup.string().default(""),
        }),
      endYear: yup
        .string()
        .default("")
        .when("currentlyWorkingHere", {
          is: false,
          then: () => yup.string().required("End year is required"),
          otherwise: () => yup.string().default(""),
        }),

      // startDate: yup.string().trim(),
      // startYear: yup.number().min(1923).max(2023),
      // endDate: yup.string().trim(),
      // endYear: yup.number().min(1923).max(2023),
    })
  ),
  // selectSubscription: yup.string().trim().oneOf(["general", "premium", "pro"]),
  otherDetails: yup.object().shape({
    timeZone: yup.object().shape({
      region: yup.string().required("Region is required"),
      timeZone: yup.string().required("Timezone is required"),
    }),
    payment: yup.string().required("Payment is required"),
    language: yup.string().required("Language is required"),
  }),
  // metaverseId: yup.string().trim(),
});

const steps = [
  {
    id: "1",
    title: "Establish Your Identity",
    name: "Set Profile",
    fields: ["username", "title", "description"],
  },
  {
    id: "2",
    title: "Showcase Your Skills",
    name: "Add Service",
    fields: ["services.skills", "services.category", "services.subCategory"],
  },
  {
    id: "3",
    name: "Add Education",
    title: "Detail Your Education History",
    fields: [
      "education",
      "education.school",
      "education.degree",
      "education.fieldOfStudy",
      "education.startMonth",
      "education.startYear",
      "education.endMonth",
      "education.endYear",
    ],
  },
  {
    id: "4",
    name: "Add Experience",
    title: "Capture Your Work Experience",
    fields: [
      "experience",
      "experience.title",
      "experience.companyName",
      "experience.location",
      "experience.locationType",
      "experience.employementType",
      "experience.currentlyWorkingHere",
      "experience.startDate",
      "experience.startYear",
      "experience.endDate",
      "experience.endYear",
    ],
  },

  {
    id: "6",
    name: "Other Details",
    title: "Additional Details and Preferences",
    fields: [
      "otherDetails.timeZone.region",
      "otherDetails.timeZone.timeZone",
      "otherDetails.payment",
      "otherDetails.language",
    ],
  },
];

export const FieldMessage = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <Typography className={twMerge("mt-3 opacity-60", className)}>
      {children}
    </Typography>
  );
};

function SetProfilePage() {
  const [tab, setTab] = useState(0);
  const isPreviousTab = tab > 0;
  const { token, user } = useContext(AuthContext);

  const methods = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const { data, isLoading: isProfileDataLoading } =
    useContext(ProfileDataContext);

  const callApi = (_data) => {
    return new Promise((resolve) => {
      const func = async () => {
        try {
          const response = await axios.post(`${BASE_URL}/set-profile`, _data, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response);
          resolve();
        } catch (error) {
          console.log(error);
          resolve("rejected");
        }
      };

      func();
    });
  };

  const onSubmit = (_data) => {
    console.log("onSubmit = ", _data);

    return callApi(_data);
  };

  const onNextClick = async () => {
    const allFieldsOfTab = steps[tab].fields;
    const errors = await methods.trigger(allFieldsOfTab, {
      shouldFocus: true,
    });

    console.log("errors = ", methods.formState.errors);

    if (errors === false) return;

    if (tab === steps.length - 1) {
      methods.handleSubmit(onSubmit)();
      return;
    }

    setTab((val) => val + 1);
  };

  const setProfileData = () => {
    methods.reset({
      title: data.title,
      description: data.description,
      education: data.education,
      experience: data.experience,
      otherDetails: data.otherDetails,
      skills: data.skills,
      username: data.username,
    });
  };

  useEffect(() => {
    if (data) {
      console.log("reaching here");
      setProfileData();
    }
  }, [user?._id, isProfileDataLoading]);

  // console.log(isProfileDataLoading, data);

  return (
    <PageLayout childrenWrapperClassName="pt-0">
      <section className="bg-woodsmoke-200 dark:bg-woodsmoke-900 py-4 mb-10">
        <div className="container-wrapper">
          <TabBar showLine={false} className="items-center space-x-3">
            {steps.map((item, i) => (
              <React.Fragment key={i}>
                <div
                  className={twMerge(
                    "border-none h-auto",
                    tab === i ? "opacity-100" : "opacity-30"
                  )}
                  // active={tab === i}
                  // onClick={() => setTab(steps.indexOf(steps[i]))}
                >
                  {item.name}
                </div>

                {i === steps?.length - 1 ? null : (
                  <FaChevronRight
                    key={`last item ${i}`}
                    className="text-xs opacity-60"
                  />
                )}
              </React.Fragment>
            ))}
          </TabBar>
        </div>
      </section>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <main className="container-wrapper">
            <Typography variant="2xl" className="font-semibold mb-6">
              {steps[tab].title}
            </Typography>

            <fieldset disabled={isProfileDataLoading}>
              {tab === 0 ? <SetProfile /> : null}
              {tab === 1 ? <AddService /> : null}
              {tab === 2 ? <AddEducation /> : null}
              {tab === 3 ? <AddExperience /> : null}
              {tab === 4 ? <OtherDetails /> : null}
              {/* {tab === 4 ? <SelectSubscription /> : null} */}
              {/* {tab === 6 ? <Metaverse /> : null} */}
            </fieldset>

            <div className="col-span-2 flex items-center justify-between mt-6">
              {/* <Button type="button" variant="outlined">
                Back
              </Button> */}
              {isPreviousTab ? (
                <Button
                  onClick={() => {
                    if (isPreviousTab) {
                      setTab((val) => val - 1);
                    }
                  }}
                  startIcon={
                    <FaChevronLeft />
                    // steps[steps.indexOf(tab) - 1] === undefined ? null : (
                    // )
                  }
                >
                  {/* {`Back: ${steps[tab - 1].name}`} */}
                  Back
                </Button>
              ) : (
                <span />
              )}

              <Button
                type="button"
                onClick={onNextClick}
                className="max-w-[10rem] w-full"
                disabled={methods.formState.isSubmitting}
                loading={methods.formState.isSubmitting}
              >
                {tab === steps.length - 1 ? "Submit" : "Next"}
              </Button>
            </div>
          </main>
        </form>
      </FormProvider>
    </PageLayout>
  );
}

export default SetProfilePage;
