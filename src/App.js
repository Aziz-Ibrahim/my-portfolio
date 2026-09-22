import React, { useEffect, useState } from 'react';
import {
    Github, ExternalLink, Mail, Linkedin, ChevronDown,
    Menu, X, Code, Server, Globe, Send,
    Database, Settings, Cloud, Brain, Rocket,
    Terminal, Layers, ShieldCheck, Cpu
} from 'lucide-react';
import {
    Badge,
    Box,
    Button,
    Card,
    Container,
    Flex,
    Grid,
    Group,
    Image,
    Modal,
    Paper,
    SimpleGrid,
    Stack,
    Text,
    Title,
    UnstyledButton
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { motion } from 'framer-motion';

import {
    personalInfo, heroContent, aboutContent, projects, contactInfo
} from './content';
import ContactForm from './ContactForm';
import SocialLink from './SocialLink';
import './App.css';

const iconMap = {
    Code, Github, Linkedin, Mail, ChevronDown, ExternalLink,
    Server, Globe, Menu, X, Send, Database,
    Settings, Cloud, Brain, Rocket, Terminal,
    Layers, ShieldCheck, Cpu
};

const fadeInUp = {
    hidden: { opacity: 0, y: 28 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' }
    })
};

const navItems = ['Home', 'About', 'Projects', 'Contact'];

const categoryLabels = {
    professional: 'Production Build',
    personal: 'Product Experiment',
    educational: 'Learning Build'
};

const ProjectCard = ({ project, index }) => {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <motion.div
                custom={index}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <Card className="project-card" padding="0" radius="md" onClick={open}>
                    <Box className="project-image-wrap">
                        <Image
                            src={project.image}
                            alt={`${project.title} screenshot`}
                            fit="cover"
                            height={220}
                        />
                    </Box>
                    <Stack gap="md" className="project-card-body">
                        <Flex justify="space-between" align="flex-start" gap="sm">
                            <Box>
                                <Badge className="category-badge">
                                    {categoryLabels[project.category] || 'Project'}
                                </Badge>
                                <Title order={3} className="project-title">{project.title}</Title>
                            </Box>
                            <ExternalLink size={20} className="project-card-icon" />
                        </Flex>
                        <Text className="project-description" lineClamp={3}>
                            {project.description}
                        </Text>
                        <Group gap={8}>
                            {project.technologies.slice(0, 5).map((tech) => (
                                <Badge key={tech} variant="light" className="tech-badge">
                                    {tech}
                                </Badge>
                            ))}
                        </Group>
                    </Stack>
                </Card>
            </motion.div>

            <Modal
                opened={opened}
                onClose={close}
                size="lg"
                radius="md"
                padding="xl"
                title={<Title order={3}>{project.title}</Title>}
                classNames={{ content: 'project-modal', header: 'project-modal-header' }}
            >
                <Stack gap="lg">
                    <Image
                        src={project.image}
                        alt={`${project.title} screenshot`}
                        radius="md"
                        fit="contain"
                        height={300}
                    />
                    <Text className="modal-description">{project.description}</Text>
                    <Box>
                        <Title order={5} mb="sm">Tech Stack</Title>
                        <Group gap={8}>
                            {project.technologies.map((tech) => (
                                <Badge key={tech} className="tech-badge">{tech}</Badge>
                            ))}
                        </Group>
                    </Box>
                    <Group grow>
                        <Button
                            component="a"
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            leftSection={<ExternalLink size={18} />}
                        >
                            Live Demo
                        </Button>
                        <Button
                            component="a"
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="outline"
                            leftSection={<Github size={18} />}
                        >
                            View Code
                        </Button>
                    </Group>
                </Stack>
            </Modal>
        </>
    );
};

const PortraitPanel = () => {
    const [portraitLoaded, setPortraitLoaded] = useState(true);

    return (
        <Box className="portrait-shell">
            {portraitLoaded ? (
                <Image
                    src={personalInfo.portrait}
                    alt={`${personalInfo.name} portrait`}
                    className="portrait-image"
                    onError={() => setPortraitLoaded(false)}
                />
            ) : (
                <Box className="portrait-fallback" aria-label={`${personalInfo.name} portrait placeholder`}>
                    AI
                </Box>
            )}
        </Box>
    );
};

const Portfolio = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const isDesktop = useMediaQuery('(min-width: 768px)');
    const isLargeScreen = useMediaQuery('(min-width: 992px)');
    const projectsCols = isLargeScreen ? 3 : (isDesktop ? 2 : 1);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 120;
            ['home', 'about', 'projects', 'contact'].forEach((section) => {
                const element = document.getElementById(section);
                if (!element) return;
                if (scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
                    setActiveSection(section);
                }
            });
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId) => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
    };

    return (
        <Box className="portfolio-shell">
            <motion.nav
                className="site-nav"
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
            >
                <Container size="xl">
                    <Flex justify="space-between" align="center" className="nav-inner">
                        <UnstyledButton className="brand-mark" onClick={() => scrollToSection('home')}>
                            <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="" className="brand-logo" />
                            <Text component="span" className="brand-title">{personalInfo.name}</Text>
                        </UnstyledButton>

                        {isDesktop ? (
                            <Group gap="xs">
                                {navItems.map((item) => {
                                    const id = item.toLowerCase();
                                    return (
                                        <Button
                                            key={item}
                                            variant="subtle"
                                            className={activeSection === id ? 'nav-link active' : 'nav-link'}
                                            onClick={() => scrollToSection(id)}
                                        >
                                            {item}
                                        </Button>
                                    );
                                })}
                            </Group>
                        ) : (
                            <Button
                                variant="subtle"
                                className="menu-button"
                                onClick={() => setIsMenuOpen((value) => !value)}
                                aria-label="Toggle navigation"
                            >
                                {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
                            </Button>
                        )}
                    </Flex>
                </Container>

                {isMenuOpen && !isDesktop && (
                    <Box className="mobile-nav">
                        {navItems.map((item) => (
                            <Button
                                key={item}
                                variant="subtle"
                                className="mobile-nav-link"
                                onClick={() => scrollToSection(item.toLowerCase())}
                            >
                                {item}
                            </Button>
                        ))}
                    </Box>
                )}
            </motion.nav>

            <Box id="home" component="section" className="hero-section">
                <Container size="xl">
                    <Grid align="center" gutter={{ base: 40, md: 64 }}>
                        <Grid.Col span={{ base: 12, md: 7 }}>
                            <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
                                <Badge className="hero-kicker" leftSection={<Cpu size={14} />}>
                                    Full-stack engineering portfolio
                                </Badge>
                                <Title className="hero-title">
                                    {personalInfo.name}
                                </Title>
                                <Text className="hero-subtitle">
                                    {personalInfo.tagline}
                                </Text>
                                <Text className="hero-copy">
                                    I build production-minded web applications across Django, Python, React, Next.js,
                                    APIs, databases, payments, AI integrations, and cloud deployment.
                                </Text>
                                <Group gap="md" mt="xl">
                                    <Button
                                        size="md"
                                        onClick={() => scrollToSection(heroContent.cta.link)}
                                        rightSection={<ChevronDown size={18} />}
                                    >
                                        View My Work
                                    </Button>
                                </Group>
                                <Group gap="lg" mt="xl">
                                    {heroContent.socialLinks.map((link) => (
                                        <SocialLink key={link.href} link={link} iconMap={iconMap} />
                                    ))}
                                </Group>
                            </motion.div>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 5 }}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.94 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.12, duration: 0.55 }}
                            >
                                <PortraitPanel />
                            </motion.div>
                        </Grid.Col>
                    </Grid>

                    <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md" className="proof-grid">
                        {heroContent.proofPoints.map((point) => (
                            <Paper key={point.label} className="proof-card" radius="md">
                                <Text className="proof-value">{point.value}</Text>
                                <Text className="proof-label">{point.label}</Text>
                            </Paper>
                        ))}
                    </SimpleGrid>
                </Container>
            </Box>

            <Box id="about" component="section" className="section about-section">
                <Container size="xl">
                    <Grid gutter={{ base: 32, md: 56 }}>
                        <Grid.Col span={{ base: 12, md: 5 }}>
                            <Badge className="section-kicker">About</Badge>
                            <Title order={2} className="section-title">Developer capability, not just visual polish.</Title>
                            <Stack gap="md" mt="xl">
                                {(aboutContent.profileText || aboutContent.aboutText).map((paragraph, index) => (
                                    <motion.div
                                        key={paragraph}
                                        custom={index}
                                        variants={fadeInUp}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                    >
                                        <Text className="about-copy">{paragraph}</Text>
                                    </motion.div>
                                ))}
                            </Stack>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 7 }}>
                            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                                {Object.values(aboutContent.skills).map((skillSet, index) => (
                                    <motion.div
                                        key={skillSet.title}
                                        custom={index}
                                        variants={fadeInUp}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, amount: 0.2 }}
                                    >
                                        <Card className="skill-card" radius="md" padding="lg">
                                            <Group align="center" gap="sm" mb="md">
                                                <Box className="skill-icon">
                                                    {React.createElement(iconMap[skillSet.icon], { size: 20 })}
                                                </Box>
                                                <Title order={4}>{skillSet.title}</Title>
                                            </Group>
                                            <Group gap={8}>
                                                {skillSet.list.map((skill) => (
                                                    <Badge key={skill} className="skill-badge">
                                                        {skill}
                                                    </Badge>
                                                ))}
                                            </Group>
                                        </Card>
                                    </motion.div>
                                ))}
                            </SimpleGrid>
                        </Grid.Col>
                    </Grid>
                </Container>
            </Box>

            <Box id="projects" component="section" className="section projects-section">
                <Container size="xl">
                    <Flex justify="space-between" align="flex-end" gap="xl" wrap="wrap" mb="xl">
                        <Box>
                            <Badge className="section-kicker">Selected Work</Badge>
                            <Title order={2} className="section-title">Applications with real product surfaces.</Title>
                        </Box>
                        <Text className="section-note">
                            Production builds, AI tools, e-commerce, dashboards, APIs, and interactive user experiences.
                        </Text>
                    </Flex>
                    <SimpleGrid cols={projectsCols} spacing="lg">
                        {projects.map((project, index) => (
                            <ProjectCard key={project.id} project={project} index={index} />
                        ))}
                    </SimpleGrid>
                </Container>
            </Box>

            <Box id="contact" component="section" className="section contact-section">
                <Container size="lg">
                    <Grid gutter="xl" align="stretch">
                        <Grid.Col span={{ base: 12, md: 5 }}>
                            <Paper className="contact-panel" radius="md">
                                <Badge className="section-kicker">Contact</Badge>
                                <Title order={2} className="section-title">Let's build something useful.</Title>
                                <Text className="contact-copy">{contactInfo.intro}</Text>
                                <Stack gap="sm" mt="xl">
                                    {contactInfo.links.map((link) => (
                                        <Button
                                            key={link.text}
                                            component="a"
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            variant={link.text.includes('Email') ? 'filled' : 'outline'}
                                            leftSection={React.createElement(iconMap[link.icon], { size: 18 })}
                                        >
                                            {link.text}
                                        </Button>
                                    ))}
                                </Stack>
                            </Paper>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 7 }}>
                            <ContactForm />
                        </Grid.Col>
                    </Grid>
                </Container>
            </Box>

            <Box component="footer" className="site-footer">
                <Container size="xl">
                    <Flex justify="space-between" align="center" gap="md" wrap="wrap">
                        <Text>&copy; 2026 {personalInfo.name}. Built with React and Mantine.</Text>
                        <Group gap="sm">
                            <Badge className="footer-badge">Django</Badge>
                            <Badge className="footer-badge">React</Badge>
                            <Badge className="footer-badge">Cloud</Badge>
                        </Group>
                    </Flex>
                </Container>
            </Box>
        </Box>
    );
};

export default Portfolio;
