import { Github, Linkedin, Twitter } from "lucide-react";

const TEAM = [
  {
    name: "Team Member",
    role: "Co-founder",
    bio: "Building the future of engineering hiring.",
    image: null,
    links: {
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
  // Add more team members as needed
];

export default function Team() {
  return (
    <main className="min-h-screen bg-background pt-20">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Header */}
          <header className="mb-16 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              The Team
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're a small team of engineers who believe hiring should be based
              on how you think, not what's on your resume.
            </p>
          </header>

          {/* Team Grid */}
          <section className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {TEAM.map((member, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-lg p-6 text-center"
                >
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-3xl text-muted-foreground">
                        {member.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-primary mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    {member.bio}
                  </p>
                  <div className="flex justify-center gap-3">
                    {member.links.github && (
                      <a
                        href={member.links.github}
                        className="text-muted-foreground hover:text-foreground transition"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                    )}
                    {member.links.linkedin && (
                      <a
                        href={member.links.linkedin}
                        className="text-muted-foreground hover:text-foreground transition"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                    )}
                    {member.links.twitter && (
                      <a
                        href={member.links.twitter}
                        className="text-muted-foreground hover:text-foreground transition"
                      >
                        <Twitter className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Join Us */}
          <section className="bg-card border border-border rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Join Us
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              We're always looking for people who are passionate about fixing
              how engineering hiring works. Reach out if you want to contribute.
            </p>
            <a
              href="mailto:hello@buildcored.com"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-black bg-white hover:bg-white/90 transition"
            >
              Get in Touch
            </a>
          </section>
        </div>
      </main>
  );
}
