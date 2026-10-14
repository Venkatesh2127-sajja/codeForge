import PageContainer from "../components/common/PageContainer";

import Hero from "../components/home/Hero";
import HomeSearch from "../components/home/HomeSearch";

import TechnologyCard from "../components/home/TechnologyCard";
import LearningPathCard from "../components/home/LearningPathCard";
import TutorialCard from "../components/home/TutorialCard";
import ProblemCard from "../components/home/ProblemCard";
import ProjectCard from "../components/home/ProjectCard";

import SectionHeader from "../components/common/SectionHeader";

import { technologies } from "../data/technologies";

import {
  learningPaths,
  popularTutorials,
  popularProblems,
  featuredProjects
} from "../data/homeData";

function Home() {
  return (
    <div className="home-page">

      {/* =========================
          Hero + Search
      ========================= */}

      <PageContainer>
        <Hero />
        <HomeSearch />
      </PageContainer>


      {/* =========================
          Popular Technologies
      ========================= */}

      <PageContainer>

        <section className="home-section">

          <SectionHeader
            title="Popular Technologies"
            description="Start learning the technologies developers use to build modern applications."
            actionText="View all tutorials"
            actionLink="/tutorials"
          />

          <div className="technology-grid">

            {technologies.map((technology) => (
              <TechnologyCard
                key={technology.id}
                technology={technology}
              />
            ))}

          </div>

        </section>

      </PageContainer>


      {/* =========================
          Learning Paths
      ========================= */}

      <PageContainer>

        <section className="home-section">

          <SectionHeader
            title="Learning Paths"
            description="Follow a structured path instead of learning random topics."
          />

          <div className="learning-path-grid">

            {learningPaths.map((path) => (
              <LearningPathCard
                key={path.id}
                path={path}
              />
            ))}

          </div>

        </section>

      </PageContainer>


      {/* =========================
          Popular Tutorials
      ========================= */}

      <PageContainer>

        <section className="home-section">

          <SectionHeader
            title="Popular Tutorials"
            description="Learn concepts step-by-step with examples and practical explanations."
            actionText="View all"
            actionLink="/tutorials"
          />

          <div className="content-grid">

            {popularTutorials.map((tutorial) => (
              <TutorialCard
                key={tutorial.id}
                tutorial={tutorial}
              />
            ))}

          </div>

        </section>

      </PageContainer>


      {/* =========================
          Coding Problems
      ========================= */}

      <PageContainer>

        <section className="home-section">

          <SectionHeader
            title="Practice Coding"
            description="Improve your problem-solving skills by solving coding problems."
            actionText="View all problems"
            actionLink="/practice"
          />

          <div className="problem-list">

            {popularProblems.map((problem) => (
              <ProblemCard
                key={problem.id}
                problem={problem}
              />
            ))}

          </div>

        </section>

      </PageContainer>


      {/* =========================
          Featured Projects
      ========================= */}

      <PageContainer>

        <section className="home-section">

          <SectionHeader
            title="Featured Projects"
            description="Stop only watching tutorials. Build real applications."
            actionText="View all projects"
            actionLink="/projects"
          />

          <div className="project-grid">

            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
              />
            ))}

          </div>

        </section>

      </PageContainer>


      {/* =========================
          Final CTA
      ========================= */}

      <PageContainer>

        <section className="home-cta">

          <h2>
            Ready to start learning?
          </h2>

          <p>
            Choose a technology and start building your skills today.
          </p>

          <a
            href="/tutorials"
            className="hero-primary-button"
          >
            Explore CodeForge
          </a>

        </section>

      </PageContainer>

    </div>
  );
}

export default Home;