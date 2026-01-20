// src/app/data/resume.ts
import fs from "fs";
import path from "path";

function readTextFile(relativePath: string) {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf-8");
}


export const cvData = {
    personalInfo: {
        name: "Igor Winandy",
        title: "Software Developer", // Inferred from context
        email: "igor.winandy@gmail.com",
        location: "Luxembourg",
        github: "github.com/Igor-tab",
        linkedin: "www.linkedin.com/in/igor-winandy-6108ab193", 
        driversLicense: "Driving License B / Personal Vehicle",
        intro: readTextFile("app/lib/Text/intro.txt"),
        about: "Passionate about problem-solving, I seek to create software solutions that are both high-performing and well-designed. My intensive C/C++ training at 42 School gave me the tools, while my professional background taught me how to analyze complex systems in order to improve them. I bring a structured approach, an understanding of business challenges, and a strong drive to take on ambitious projects."
    },
    techStack: [
        "C/C++", "Java", "JavaScript/HTML/CSS", "Linux/Bash",
        "WordPress", "Nginx", "SQL (MySQL, MariaDB)",
        "Git", "Docker", "Prompting"
    ],
    projects: [
        {
            name: "webserv",
            tech: "C++",
            description: readTextFile("app/lib/Text/webserve.txt")
        },
        {
            name: "miniRT",
            tech: "C",
            description: readTextFile("app/lib/Text/minirt.txt")
        },
        {
            name: "inception",
            tech: "VM & Docker",
            description: readTextFile("app/lib/Text/inception.txt")
        },
        {
            name: "minishell",
            tech: "C",
            description: readTextFile("app/lib/Text/minishell.txt")
        },
        {
            name: "Auto Study Scheduler App",
            tech: "Android Studio, java",
            description: readTextFile("app/lib/Text/Auto_study_scheduler.txt")
        }
    ],
    languages: [
        { name: "English", level: "Fluent" },
        { name: "French", level: "Fluent" },
        { name: "German", level: "Fluent" },
        { name: "Luxembourgish", level: "Fluent" },
        { name: "Russian", level: "Fluent" }
    ],
    hobbies: [
        "Skiing",
        "Mountain Biking",
        "Trail Running",
        "Climbing",
        "Video/Board Games",
        "Music/playing Guitar"
    ],
    experience: [
        {
            company: "TMF Luxembourg",
            role: "Payroll Officer",
            period: "2023 - 2024",
            description: "Managed payroll for a diverse client portfolio, ensuring data accuracy and compliance with local regulations."
        },
        {
            company: "SD WORX",
            role: "Junior to Payroll Consultant",
            period: "2020 - 2023",
            description: "Rapidly progressed from Junior to Consultant, leading digital transformation initiatives to streamline administrative procedures and implement email-based control systems within my team."
        },
        {
            company: "Luxembourg Armed Forces",
            role: "Voluntary Soldier",
            period: "2018 - 2019",
            description: "Delta division, Advanced training. Driver for the Grand Ducal Court. Alpha division - National Guard."
        },
        {
            company: "Maison des sciences (ASBL)",
            role: "Volunteer",
            period: "2014 - 2018",
            description: "Organization of events and ski trips."
        }
    ],
    education: [
        {
            institution: "42 School Luxembourg",
            degree: "42",
            period: "2025",
            location: "Belval/Esch-sur-Alzette(L)"
        },
        {
            institution: "Digital Learning Hub",
            degree: "DevOps Training, End-to-end CI/CD pipelines",
            period: "2024",
            location: "Belval/Esch-sur-Alzette(L)"
        },
        {
            institution: "Oracle",
            degree: "Oracle Certified Associate, Java SE 8 Programmer",
            period: "2024",
            location: "1Z0-808 exam"
        },
        {
            institution: "SD WORX Academy",
            degree: "Payroll qualification",
            period: "2021",
            location: "Capellen(L)"
        },
        {
            institution: "CNFPC",
            degree: "Professional salary management training",
            period: "2020",
            location: "Belval/Esch-sur-Alzette(L)"
        },
        {
            institution: "Catholic University of Louvain",
            degree: "Bachelor’s Studies in Computer Science",
            period: "2016 - 2018",
            location: "Louvain-la-Neuve(BE)"
        },
        {
            institution: "Catholic University of Louvain",
            degree: "Bachelor’s Studies in Physics",
            period: "2013 - 2016",
            location: "Louvain-la-Neuve(BE)"
        },
        {
            institution: "Institut Notre-Dame",
            degree: "UPPER SECONDARY EDUCATION CERTIFICATE (CESS)",
            period: "2012",
            location: "Arlon(Be)"
        }
    ]
};