function Cv() {
  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  //   // bodyClass: "printing",
  // });
  // const certificates = JSON.parse(
  //   localStorage.getItem(localStorageKeys.CERTIFICATE_KEY)
  // );
  // const experience = JSON.parse(
  //   localStorage.getItem(localStorageKeys.EXPERIENCE_KEY)
  // );

  // if (!user) {
  //   return <p>loading...</p>;
  // }

  return (
    <div>
      <p>CV</p>
      {/* <div className="flex items-center justify-between mb-5">
        <Typography variant="xl">Your CV</Typography>
        <Button
          variant="simple"
          className="h-auto underline text-blue-600"
          // onClick={handlePrint}
        >
          Download
        </Button>
      </div>

      <div
        // ref={componentRef}
        className="bg-woodsmoke-200 dark:bg-woodsmoke-900 print:bg-transparent print:absolute print:top-0 print:left-0 print:h-full print:w-full print:overflow-visible flex flex-col rounded-lg overflow-hidden"
      >
        <div className="[&>*]:py-6 [&>*]:px-7 grid sm:grid-cols-[1fr_.5fr] gap-6 overflow-hidden flex-1">
          <div>
            <header className="flex space-x-4 items-center">
              <img
                // src="/images/propic.png"
                src={getUserProfilePhoto(user?._id)}
                className="rounded-full w-20 h-20 object-cover bg-woodsmoke-400 flex-shrink-0"
                alt=""
              />
              <div>
                <Typography variant="2xl" className="font-medium opacity-70">
                  {user.FullName}
                </Typography>
                {user?.country ? (
                  <Typography>{user?.country}</Typography>
                ) : null}
              </div>
            </header>

            <Typography variant="2xl" className="mt-4">
              {user?.title}
            </Typography>

            <main className="mt-5 space-y-8">
              <section>
                <Typography variant="xl" className="mb-4">
                  Summary
                </Typography>
                <Typography>{user.description}</Typography>
              </section>

              {experience && experience?.length !== 0 ? (
                <section>
                  <Typography variant="xl" className="mb-4">
                    Experience
                  </Typography>

                  <div className="space-y-4">
                    {experience.map((item, i) => (
                      <EmploymentHistoryCard
                        key={i}
                        id={item.id}
                        title={item.title}
                        companyName={item.companyName}
                        location={item.location}
                        locationType={item.locationType}
                        employmentType={item.employmentType}
                        startMonth={item.startMonth}
                        startYear={item.startYear}
                        currentlyWorking={item.currentlyWorking}
                        endMonth={item.endMonth}
                        endYear={item.endYear}
                      />
                    ))}
                  </div>
                </section>
              ) : null}
            </main>
          </div>

          <div className="bg-woodsmoke-300 space-y-6">
            <section>
              <Typography variant="xl" className="mb-4">
                Contact
              </Typography>

              <Typography className="break-all">{user.email}</Typography>
            </section>

            <section>
              <Typography variant="xl" className="mb-4">
                Top Skills
              </Typography>

              <div className="flex flex-wrap [&>*]:m-1 -m-1">
                {user.skills.map((skill, i) => (
                  <Pill key={i}>{skill}</Pill>
                ))}
              </div>
            </section>

            {certificates && certificates?.length !== 0 ? (
              <section>
                <Typography variant="xl" className="mb-4">
                  Certifications
                </Typography>

                {certificates.map((item, i) => (
                  <CertificateCard key={i} id={item?.id} name={item.name} />
                ))}
              </section>
            ) : null}
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Cv;
