
export const propertiesVsYaml = {
  id: "properties-vs-yaml",
  title: "Properties vs YAML",
  slug: "properties-vs-yaml",
  topicTitle: "Spring Boot Configuration",
  estimatedTime: "30 min",

  description:
    "Compare application.properties and application.yml, understand their syntax and configuration behavior, convert between formats, and choose a maintainable configuration style for Spring Boot applications.",

  sections: [
    {
      id: "basic-comparison",
      title: "1. Properties vs YAML",

      paragraphs: [
        "Spring Boot supports both properties-based and YAML-based configuration. Both formats can define application settings such as server ports, application names, database connections, logging levels, and custom application properties.",
        "The main difference is how configuration is represented. A properties file typically uses key=value entries, while YAML uses indentation to represent hierarchical structures.",
        "For example, the property spring.datasource.url can be written directly as a dotted key in application.properties. In application.yml, the same property is represented using nested spring and datasource sections.",
        "Both formats can configure the same Spring Boot property. Choosing one does not make the application faster or change the business logic. The decision mainly affects readability, formatting, team conventions, and maintenance.",
        "Common filenames are application.properties and application.yml. They are usually stored in src/main/resources. Spring Boot can also load supported external configuration files."
      ],

      code: {
        language: "text",
        code: `Properties format:
spring.datasource.url=jdbc:mysql://localhost:3306/codeforge

YAML format:
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/codeforge`
      },

      bullets: [
        "Properties uses key-value entries.",
        "YAML uses indentation and hierarchical structure.",
        "Both formats are supported by Spring Boot.",
        "Both can represent the same configuration property.",
        "Neither format is universally better.",
        "Use consistent conventions throughout a project."
      ]
    },

    {
      id: "properties-example",
      title: "2. Understanding application.properties",

      paragraphs: [
        "application.properties is a text-based configuration file in which each entry normally consists of a property name and a value separated by an equals sign.",
        "Dotted property names represent relationships between configuration settings. For example, spring.datasource.username identifies the username setting within Spring Boot's datasource configuration.",
        "This format is straightforward when you want to locate or change an individual property. It also works well with command-line overrides and environment-variable-based deployment configuration.",
        "Comments can be added with #. Each property should be written on a separate line for readability."
      ],

      code: {
        language: "properties",
        code: `# Server configuration
server.port=8081
spring.application.name=codeforge-api

# Database configuration
spring.datasource.url=jdbc:mysql://localhost:3306/codeforge
spring.datasource.username=codeforge_user
spring.datasource.password=\${DB_PASSWORD}

# Custom application configuration
app.name=CodeForge
app.version=1.0
app.features.ai=true`
      },

      paragraphs: [
        "The server.port property configures the embedded web server port. The spring.application.name property sets the application's name.",
        "The spring.datasource properties configure database connectivity when the appropriate Spring Boot database dependencies and JDBC driver are present.",
        "The app.name, app.version, and app.features.ai entries are custom application properties. Spring Boot does not automatically implement a feature merely because a custom property exists; application code must read or bind it.",
        "The DB_PASSWORD placeholder references an external property. The environment or another applicable configuration source must supply DB_PASSWORD unless a fallback is defined elsewhere."
      ],

      bullets: [
        "Use = to assign a property value.",
        "Use dotted keys to represent related settings.",
        "Use # for comments.",
        "Keep sensitive credentials out of committed configuration files.",
        "Choose descriptive names for custom properties."
      ]
    },

    {
      id: "yaml-example",
      title: "3. Understanding application.yml",

      paragraphs: [
        "YAML stands for YAML Ain't Markup Language. It is a human-readable data format that represents nested structures using indentation.",
        "In Spring Boot, application.yml can express the same configuration as application.properties. Related settings can be grouped under parent keys, making large configuration files easier to navigate.",
        "YAML uses a colon after a key. A space should follow the colon before a scalar value. Indentation determines the parent-child relationship between entries.",
        "Use spaces rather than tabs for indentation. Incorrect indentation can cause a parsing error or place a property at the wrong level."
      ],

      code: {
        language: "yaml",
        code: `# Server configuration
server:
  port: 8081

spring:
  application:
    name: codeforge-api

  datasource:
    url: jdbc:mysql://localhost:3306/codeforge
    username: codeforge_user
    password: \${DB_PASSWORD}

app:
  name: CodeForge
  version: "1.0"
  features:
    ai: true`
      },

      paragraphs: [
        "The YAML nesting represents dotted property paths. For example, server followed by port corresponds to server.port. The nested datasource url corresponds to spring.datasource.url.",
        "Quote values when necessary to avoid unwanted YAML type interpretation. Quoting version-like values can help preserve their intended string representation.",
        "YAML supports structures such as nested mappings and lists. These features can be helpful when configuring multiple servers, feature lists, or groups of related settings.",
        "As with properties files, custom YAML entries only affect application behavior when a framework component or application class consumes them."
      ],

      bullets: [
        "Use consistent indentation, commonly two spaces per level.",
        "Do not use tabs for YAML indentation.",
        "Use a colon followed by a space between a key and its value.",
        "Quote values when their intended string representation could be ambiguous.",
        "Use meaningful nesting rather than making every setting deeply nested."
      ]
    },

    {
      id: "comparison-table",
      title: "4. Key Differences",

      paragraphs: [
        "The formats have different syntax but can express equivalent Spring Boot settings. Select the format that makes the configuration easiest for your team to understand and maintain."
      ],

      bullets: [
        "Syntax: properties generally uses key=value, while YAML uses key: value.",
        "Nesting: properties often expresses nested settings with dotted names, while YAML represents nesting through indentation.",
        "Readability: YAML can make related settings easier to see as a group.",
        "Individual lookups: properties can be convenient when searching for one exact key.",
        "Lists: YAML supports readable list structures; properties can represent collection values using indexed or comma-separated property conventions where supported.",
        "Formatting: YAML indentation must be correct, while properties files do not use indentation to establish hierarchy.",
        "Comments: both formats support comments, although their comment syntax is applied differently within their respective file formats.",
        "Compatibility: both are supported Spring Boot configuration formats.",
        "Security: neither format automatically protects a password just because it is stored in that format.",
        "Maintenance: consistency and clear organization matter more than choosing a fashionable format."
      ],

      code: {
        language: "text",
        code: `application.properties
---------------------
spring.datasource.url=jdbc:mysql://localhost:3306/codeforge
spring.datasource.username=codeforge_user

application.yml
---------------
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/codeforge
    username: codeforge_user`
      }
    },

    {
      id: "when-to-use",
      title: "5. When Should You Use Properties or YAML?",

      paragraphs: [
        "There is no universal requirement to use one format for every Spring Boot project. The appropriate choice depends on configuration complexity, team familiarity, project conventions, and maintainability.",
        "Properties is often a good choice for a small configuration file containing a limited number of independent key-value settings. Its simple syntax makes individual keys easy to scan.",
        "YAML can be convenient for applications with many related settings, nested configuration objects, lists, and multiple configuration groups. The hierarchy can make the relationships between properties more visible.",
        "Some teams prefer YAML for the main application configuration and properties files for small examples or tests. That approach can work, but a project should avoid unnecessary duplication and confusing overlapping configuration.",
        "For either format, separate environment-specific values using supported mechanisms such as Spring Profiles, external configuration, and environment variables."
      ],

      bullets: [
        "Choose properties when a flat key-value structure is sufficient.",
        "Choose YAML when nested configuration is easier to understand hierarchically.",
        "Follow existing repository conventions when joining an established project.",
        "Keep configuration consistent across development and production.",
        "Avoid duplicating the same keys in multiple files without a clear reason.",
        "Use profile-specific configuration when different environments need different values."
      ]
    },

    {
      id: "conversion",
      title: "6. Converting Between Properties and YAML",

      paragraphs: [
        "A property expressed with a dotted key can often be converted to YAML by splitting the key into nested levels. The final value remains associated with the same logical property.",
        "When converting a real configuration file, preserve the intended data types, lists, placeholder expressions, special characters, and profile-specific behavior. A simple text replacement may not be sufficient for every YAML structure.",
        "The examples below show equivalent custom application settings."
      ],

      code: {
        language: "properties",
        code: `app.name=CodeForge
app.version=1.0
app.features.ai=true
app.features.compiler=true`
      },

      paragraphs: [
        "The equivalent YAML representation groups the feature settings under app.features."
      ],

      code: {
        language: "yaml",
        code: `app:
  name: CodeForge
  version: "1.0"
  features:
    ai: true
    compiler: true`
      },

      bullets: [
        "app.name becomes app followed by name.",
        "app.version becomes app followed by version.",
        "app.features.ai becomes app, features, and ai.",
        "Boolean values such as true should retain their intended type.",
        "Quote values when needed to preserve a string rather than an inferred YAML type.",
        "Test the converted configuration by starting the application and checking the resolved behavior."
      ]
    },

    {
      id: "important-points",
      title: "7. Important Points and Common Mistakes",

      paragraphs: [
        "Changing the file format does not change the meaning of a correctly represented Spring Boot property. Problems usually arise from syntax mistakes, type interpretation, configuration precedence, profile activation, or duplicated settings.",
        "When a configuration value is not behaving as expected, check the actual property name, the active profile, the file location, and whether an environment variable or command-line argument supplies an overriding value.",
        "Spring Boot supports both formats, but avoid maintaining two files with overlapping properties unless you deliberately understand how they interact. When the same property is defined in multiple sources, property-source precedence determines the effective value."
      ],

      bullets: [
        "Both application.properties and application.yml are supported.",
        "YAML indentation changes the configuration hierarchy.",
        "Properties files use key-value entries rather than indentation for hierarchy.",
        "Do not assume a custom property automatically changes application behavior.",
        "Do not commit production passwords or API keys.",
        "Do not assume the value in the file is necessarily the final resolved value.",
        "Check Spring Profiles when a setting works locally but not in deployment.",
        "Avoid duplicate configuration that makes troubleshooting difficult.",
        "Use appropriate quoting for values that could be interpreted differently by YAML.",
        "Validate the configuration by running the application and testing the affected behavior."
      ],

      code: {
        language: "text",
        code: `Troubleshooting checklist

1. Confirm the file is in the expected location.
2. Check spelling and property names.
3. Validate YAML indentation and syntax.
4. Confirm the active Spring Profile.
5. Check environment variables and command-line overrides.
6. Verify required placeholders are supplied.
7. Restart the application when required.
8. Test the resulting application behavior.`
      }
    },

    {
      id: "interview",
      title: "8. Interview Questions and Answers",

      interviewQuestions: [
        {
          question: "What is the difference between application.properties and application.yml?",
          answer: "application.properties generally uses key=value entries, while application.yml uses indentation and hierarchical structures. Both can represent Spring Boot configuration."
        },
        {
          question: "Which format is better: properties or YAML?",
          answer: "Neither is universally better. Properties can be convenient for flat configuration, while YAML can be easier to read for nested settings. The choice depends on project conventions and maintainability."
        },
        {
          question: "Where are application.properties and application.yml usually stored?",
          answer: "They are commonly stored in src/main/resources and become classpath configuration resources in a typical Spring Boot application."
        },
        {
          question: "How do you configure the server port in properties format?",
          answer: "Use server.port=8081 in application.properties."
        },
        {
          question: "How do you configure the server port in YAML?",
          answer: "Use server: followed by an indented port: 8081 entry in application.yml."
        },
        {
          question: "How is a nested property represented in properties format?",
          answer: "A nested property is commonly represented with a dotted key, such as spring.datasource.url."
        },
        {
          question: "How is the same nested property represented in YAML?",
          answer: "Use indentation, for example spring, then datasource, then url."
        },
        {
          question: "What is the main concern when writing YAML?",
          answer: "Indentation must be consistent because it determines the hierarchy. Incorrect indentation can produce a parsing error or an unintended structure."
        },
        {
          question: "Can both properties and YAML be used in Spring Boot?",
          answer: "Yes. Spring Boot supports both formats. Teams should avoid unnecessary duplication and understand how overlapping configuration sources are resolved."
        },
        {
          question: "Does YAML improve application performance compared with properties?",
          answer: "Choosing YAML does not inherently make application business logic faster. The primary difference is the configuration format and its maintainability."
        },
        {
          question: "How do you add a comment to a properties file?",
          answer: "Use # at the start of a comment line."
        },
        {
          question: "How do you represent a boolean setting in YAML?",
          answer: "A boolean can be represented as a value such as enabled: true. The consuming configuration mechanism determines how that property is bound and used."
        },
        {
          question: "Can YAML represent lists?",
          answer: "Yes. YAML supports lists using a dash for each list item, which can make collection configuration easier to read."
        },
        {
          question: "How do you externalize a database password in either format?",
          answer: "Reference an externally supplied value, such as ${DB_PASSWORD}, rather than committing a real password to the configuration file."
        },
        {
          question: "What should you check if a configuration value is not taking effect?",
          answer: "Check the property name, file location, active profile, placeholder resolution, environment variables, command-line arguments, and property-source precedence."
        },
        {
          question: "Can application.properties and application.yml define the same property?",
          answer: "They can both contain a property, but maintaining overlapping definitions can be confusing. The effective value depends on Spring Boot's configuration loading and property-source precedence rules."
        },
        {
          question: "What is a profile-specific configuration file?",
          answer: "It is a configuration file associated with a Spring Profile, such as application-dev.yml, that supplies settings when the corresponding profile is active."
        },
        {
          question: "Explain Properties vs YAML in an interview.",
          answer: "Spring Boot supports both application.properties and application.yml. Properties uses key-value syntax and commonly represents nested settings with dotted keys. YAML uses indentation to represent hierarchy, which can make complex configuration easier to read. Both formats support Spring Boot configuration, so the choice depends on the project's structure and team conventions."
        }
      ]
    }
  ]
};
