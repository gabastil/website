/**
 * Filename: resume_resource.js
 * Author: Glenn Abastillas
 * Date: February 18, 2020
 *
 * Resume text to load onto website
 *
 * The four major sections of the resume constant are:
 *      1. background
 *      2. experience
 *      3. publications
 *      4. education
 *
 */
console.log("Inside resume_resource.js");

const RESUME =

{
    background : {
        summary : "Data scientist, natural language processing (NLP) developer" +
                  ", and computational linguist with over seven years of exper" +
                  "ience developing NLP and machine learning (ML) algorithms, " +
                  "dashboards,data visualizations, and supporting research in " +
                  "the health domain. He takes a human-centered design approac" +
                  "h to developing solutions and software for clients.",
        skills : [
            {
                skill : "&#x1F310;<br>Languages",
                list : ["English",
                        "German",
                        "Spanish",
                        "Portuguese",
                        "Cebuano",
                        "Arabic",
                        "Vietnamese",
                        "Mandarin"]
            },
            {
                skill : "&#x1F4BB;<br>Languages",
                list : ["Python",
                        "R",
                        "SQL",
                        "JavaScript",
                        "Lua",
                        "Java",
                        "PHP",
                        "Visual Basic"]
            },
            {
                skill : "&#x1F4BE;<br>Markup & Formats",
                list : ["HTML",
                        "XML",
                        "YAML",
                        "CSS",
                        "Markdown",
                        "JSON",
                        "HL7",
                        "FHIR"]
            },
            {
                skill : "&#x1f468;&#x200d;&#x1f4bb;<br>IDEs",
                list : ["Anaconda",
                        "Spyder",
                        "Jupyter",
                        "SageMaker",
                        "RStudio",
                        "I2E"]
            },
            {
                skill : "&#x1F5A7;<br>Distributed",
                list : ["Spark",
                        "Hadoop",
                        "Multithreading"]
            },
            {
                skill : "&#x1F5A5;&#xFE0F;<br>Envs and Repos",
                list : ["Docker",
                        "Anaconda",
                        "GitHub",
                        "Azure Repository"]
            },
            {
                skill : "&#x1F4CA;<br>Dashboards",
                list : ["Power BI", "Tableau"]
            },
            {
                skill : "&#x1F58C;&#xFE0F;<br>Visual Editing",
                list : ["Visio",
                        "Draw.io",
                        "Photoshop",
                        "Vegas",
                        "Corel",
                        "Illustrator"]
            },
            {
                skill : "&#x1F4C0;<br>Office Software",
                list : ["Word",
                        "PowerPoint",
                        "Excel",
                        "Access",
                        "Outlook",
                        "Visio"]
            },
            {
                skill : "&#x1F4DC;<br>Certifications",
                list : ["Registered Nurse",
                        "Basic Life Support",
                        "Translator",
                        "Scrum Master"]
            },
        ]
    },

    experience : [
        {name : "Booz Allen Hamilton",
         title : "Sr. Data Scientist",
         location : "Washington, DC",
         years : [2018, null],
         summary : "Management Consulting firm where I work with cross-fun" +
                   "ctional teams to deliver NLP, ML, and design thinking " +
                   "solutions to meet client needs at the National Institu" +
                   "tes of Health (NIH) and Veterans Affairs (VA).",
         description : [
             "Lead data science efforts in collaboration with human centered design teams",
             "Plan projects, elicit requirements, iterate on deliverables, and present reports to client",
             "Develop NLP and machine learning algorithms, topic models, and automated pipelines",
             "Develop browser-based tools for workshops, presentations, and client engagement",
             "Conduct design thinking and requirements gathering workshops with stakeholders",
             "Founded and led rapid response team to address urgent, ad-hoc client needs"
         ]},
        {name : "Information Management Systems, Inc.",
         title : "NLP Query Specialist",
         location : "Calverton, MD",
         years : [2016, 2018],
         summary : "Technology consulting firm where I worked with cross-functional teams at the NIH to identify client needs and develop NLP and ML solutions and presented results at conferences in the US and Canada.",
         description : [
             "Developed NLP algorithms for information extraction of data elements from pathology reports",
             "Developed data pipelines for ETL procedures and for structuring unstructured pathology data",
             "Provided Arabic language support for cancer data capture from the Middle East",
             "Trained annotators and custom-built annotation tools to curate custom datasets for each project",
         ]},
        {name : "3M - Health Information Systems",
         title : "Computational Linguist",
         location : "Silver Spring, MD",
         years : [2015, 2016],
         summary : "Technology firm where I worked with cross-functional teams across the US to develop clinical decision support functionality for enterprise electronic medical record software developed by the firm.",
         description : [
             "Developed NLP algorithms for clinical decision support modules in electronic medical records",
             "Employed NLP for information extraction on medical reports to develop knowledge resources",
             "Created clinical language ontologies used to detect medical entities",
             "Ran unit tests for clinical decision support modules written by other developers",
         ]},
        {name : "Center for Applied Linguistics",
         title : "Program Associate",
         location : "Washington, DC",
         years : [2013, 2015],
         summary : "Linguist research and development firm where I worked with test developers and other linguists to develop high-quality language assessment data items for heritage language speakers across the US.",
         description : [
             "Developed Python scripts for various projects to streamline ETL of language data",
             "Conducted unit tests on interactive web-based test items and visuals",
             "Reviewed language test items in English and Spanish to test item visuals, language, and difficulty",
         ]},
        {name : "Schreiber Translations, Inc.",
         title : "Spanish and German Translator",
         location : "Rockville, MD",
         years : [2013, null],
         summary : "Translation firm engaged with high-fidelity translations of various types of sensitive documents for the federal government.",
         description : [
             "Translated sensitive legal documents to English from source languages for federal clients",
             "Reviewed translations performed by other translations for linguistic streamlining of narrative",
         ]},
        {name : "Mathematica Policy Research",
         title : "Multilingual Field Interviewer",
         location : "Princeton, NJ",
         years : [2011, 2013],
         summary : "Public policy research firm where I worked to collect data for various monitoring and evaluation projects.",
         description : [
             "Interviewed hard to reach populations across the US who are recipients of federal programmes",
             "Educated participants of surveys evaluating federal programmes on tracking and gathering programme-specific data such as tracking food purchases and consumption",
             "Located hard to reach respondents with tools such as Accurint to ensure studies and surveys maintain adequate responses for analysis",
         ]},
        {name : "Hackensack University Medical Center",
         title : "Registered Nurse",
         location : "Hackensack, NJ",
         years : [2010, 2011],
         summary : "Regional trauma center where I worked with multi-disciplinary teams to provide high quality nursing to improve patient health outcomes and ensured continuity of care for patients and family members.",
         description : [
             "Admitted ambulatory, acute, and transfer patients to the epilepsy monitoring unit",
             "Administered medications via various routes of administration",
             "Coordinate care with healthcare providers and provide nursing care to patients and family",
             "Educated patients and family members on home care and medication upon discharge",
         ]}
    ],

    publications : [
        {
            authors : ["Abastillas, G"],
            year : 2018,
            name : "You are what you tweet: A Divergence in " +
                   "code-switching practices in Cebuano and " +
                   "English speakers in the Philippines",
            other : {
                "book" : "Language & Literature in a Glocal World",
                "publisher" : "Singapore: Springer"
            },
            link : "https://doi.org/10.1007/978-981-10-8468-3"
        },
        {
            authors : ["Abastillas, G. L.",
                       "Morris, S. D.",
                       "Boten, J. A.",
                       "Tumurchudur, T.",
                       "Vora, K.",
                       "Fearn, P. F."],
            year : 2017,
            name : "Characterizing a Learning Curve for Annotat" +
                   "ing Data for Training and Validation of Nat" +
                   "ural Language Processing Systems",
            other : {
                "meeting" : "Poster presented at: American Medical " +
                            "Informatics Association Annual Symposium",
                "meeting-date" : "2017 November 4 - 8: Washington, DC"
            },
            link : null
        },
        {
            authors : ["Abastillas, G.",
                       "Lam, C.",
                       "Petkov, V.",
                       "Adamo, P.",
                       "Coyle, L.",
                       "Stevens, J.",
                       "Wu, X. C.",
                       "Hsieh, M. C.",
                       "Negoita, S"],
            year : 2017,
            name : "Data Quality Audit on Melanoma Tumor Depth " +
                   "with Rule-Based Natural Language Processing",
            other : {
                "meeting" : "Poster presented at: North American " +
                            "Association of Central Cancer Regist" +
                            "ries (NAACCR) Annual Conference",
                "meeting-date" : "2017 June 19 - 22; Albuquerque, NM"
            },
            link : null
        },
        {
            authors : ["Abastillas, G.",
                       "Lam, C."],
            year : 2017,
            name : "Data Quality Audits with Rule-Based Natural " +
                   "Language Processing",
            other : {
                "meeting" : "Presented at: Georgetown NLP Summit",
                "meeting-date" : "2017 June 28; Washington, DC"
            },
            link : null
        },
        {
            authors : ["Abastillas, G."],
            year : 2016,
            name : "You are what you tweet: A Divergence in " +
                   "code-switching practices in Cebuano and " +
                   "English speakers in the Philippines",
            other : {
                "meeting" : "Presented at: Sultan Qaboos University Connecting the Dots in a Glocalized World Conference ",
                "meeting-date" : "2016 November 3; &#x62c;&#x627;&#x645;&#x639;&#x629;&#x20;&#x627;&#x644;&#x633;&#x644;&#x637;&#x627;&#x646;&#x20;&#x642;&#x627;&#x628;&#x648;&#x633; (Sultan Qaboos University), Muscat, Oman"
            },
            link : "https://www.squ.edu.om/Portals/50/conferences/" +
                   "ConnectingTheDots/ConncetTheDots.PDF?ver=2016-" +
                   "11-02-113925-197"
        }
    ],

    education : [
        {
            school : "Georgetown University",
            years : [2013, 2015],
            degree : "Masters Degree in Linguistics",
            other : ""
        },
        {
            school : "Rutgers, the State University of New Jersey",
            years : [2006, 2010],
            degree : "Bachelor's Degree in Science",
            other : ""
        },
    ],

    resources : [
        {
            type : "LinkedIn",
            link : "https://www.linkedin.com/in/glennabastillas/"
        },
        {
            type : "GitHub",
            link : "https://github.com/gabastil"
        },
        {
            type : "General Assembly Instructor Profile",
            link : "https://generalassemb.ly/instructors/glenn-abastillas/19478"
        },
        {
            type : "Linguistics Book Chapter",
            link : "https://doi.org/10.1007/978-981-10-8468-3"
        },
    ]

};