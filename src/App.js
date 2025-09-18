import React, { useState, useEffect } from 'react';
import {
    Github, ExternalLink,
    Mail, Linkedin, ChevronDown,
    Menu, X, Download, Code,
    Server, Globe, Send, Database,
    ChevronLeft, ChevronRight
} from 'lucide-react';
import {
    Container,
    Box,
    Flex,
    Title,
    Button,
    Group,
    Stack,
    Text,
    Grid,
    Anchor,
    Paper,
    Badge,
    useMantineTheme,
    Burger,
} from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import { motion } from 'framer-motion';

import {
    personalInfo, heroContent, aboutContent, projects, contactInfo
} from './content';
import ContactForm from './ContactForm';
import SocialLink from './SocialLink';

// Icon map
const iconMap = {
    Code, Github, Linkedin, Mail, ChevronDown,
    ExternalLink, Server, Globe, Download,
    Menu, X, Send, Database, ChevronLeft, ChevronRight
};

// Animations
const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' }
    })
};

// Main Portfolio Component
const Portfolio = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const mantineTheme = useMantineTheme();
    const isDesktop = useMediaQuery(`(min-width: ${mantineTheme.breakpoints.sm})`);

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['home', 'about', 'projects', 'contact'];
            const scrollPosition = window.scrollY + 100;

            sections.forEach(section => {
                const element = document.getElementById(section);
                if (element) {
                    const offsetTop = element.offsetTop;
                    const height = element.offsetHeight;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
                        setActiveSection(section);
                    }
                }
            });
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId) => {
        document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
    };

    return (
        <Box>
            {/* Navigation */}
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    backgroundColor: 'rgba(52, 43, 33, 0.9)',
                }}
            >
                <Container size="xl" py="md">
                    <Flex justify="space-between" align="center">
                        <Title order={4} c="white">Aziz Ibrahim's Portfolio</Title>

                        {isDesktop ? (
                            <Group spacing="xl">
                                {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                                    <Button
                                        key={item}
                                        variant="subtle"
                                        onClick={() => scrollToSection(item.toLowerCase())}
                                        sx={{
                                            transition: 'all 0.3s ease',
                                            transform: activeSection === item.toLowerCase() ? 'scale(1.05)' : 'scale(1)',
                                        }}
                                        color={activeSection === item.toLowerCase() ? 'cream-accent' : 'gray.4'}
                                    >
                                        {item}
                                    </Button>
                                ))}
                            </Group>
                        ) : (
                            <Burger
                                opened={isMenuOpen}
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                size="sm"
                                color="white"
                            />
                        )}
                    </Flex>
                </Container>

                {/* Mobile Navigation */}
                {isMenuOpen && !isDesktop && (
                    <Box
                        sx={{
                            borderTop: `1px solid ${mantineTheme.colors.gray[2]}`,
                            boxShadow: mantineTheme.shadows.sm,
                            padding: mantineTheme.spacing.md,
                            backgroundColor: mantineTheme.colors['mocha-mousse'][9],
                        }}
                    >
                        <Stack spacing="xs">
                            {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                                <Button
                                    key={item}
                                    variant={activeSection === item.toLowerCase() ? 'light' : 'subtle'}
                                    color={activeSection === item.toLowerCase() ? 'cream-accent' : 'gray.4'}
                                    onClick={() => scrollToSection(item.toLowerCase())}
                                >
                                    {item}
                                </Button>
                            ))}
                        </Stack>
                    </Box>
                )}
            </motion.nav>

            {/* Hero Section */}
            <Box id="home" pt={160} pb={80}
                sx={{
                    background: mantineTheme.colors['mocha-mousse'][0],
                    boxShadow: 'inset 0 -6px 12px rgba(0,0,0,0.08)'
                }}
            >
                <Container size="xl" ta="center">
                    <motion.div initial="hidden" whileInView="visible" variants={fadeInUp}>
                        <Box sx={{
                            width: 128, height: 128, margin: 'auto',
                            marginBottom: mantineTheme.spacing.xl,
                            background: `linear-gradient(45deg, ${mantineTheme.colors['mocha-mousse'][6]}, ${mantineTheme.colors['mocha-mousse'][9]})`,
                            borderRadius: '50%', display: 'flex',
                            alignItems: 'center', justifyContent: 'center',
                            boxShadow: mantineTheme.shadows.xl,
                            transition: 'transform 0.3s ease',
                            '&:hover': { transform: 'scale(1.05)' }
                        }}>
                            {React.createElement(iconMap[heroContent.icon], { size: 64, color: 'white' })}
                        </Box>
                        <Title order={1} size="h1" fw={700} c="dark" mb="xs">{personalInfo.name}</Title>
                        <Title order={2} size="h3" fw={500} c="dimmed" mb="md">{personalInfo.title}</Title>
                        <Text fz="lg" c="dimmed" maw={600} mx="auto" mb="xl">{personalInfo.tagline}</Text>
                        <Flex gap="xl" justify="center" align="center" mb="xl">
                            {heroContent.socialLinks.map((link, index) => (
                                <SocialLink key={index} link={link} iconMap={iconMap} color="mocha-mousse" />
                            ))}
                        </Flex>
                        <Button
                            onClick={() => scrollToSection(heroContent.cta.link)}
                            size="lg"
                            color="mocha-mousse"
                            sx={{ transition: 'transform 0.2s ease', '&:hover': { transform: 'scale(1.05)' } }}
                        >
                            <Group spacing="xs">
                                <Text>{heroContent.cta.text}</Text>
                                {React.createElement(iconMap[heroContent.cta.icon])}
                            </Group>
                        </Button>
                    </motion.div>
                </Container>
            </Box>

            {/* About Section */}
            <Box id="about" py={80}
                sx={{
                    background: mantineTheme.colors['cream-accent'][0],
                    boxShadow: '0 -6px 12px rgba(0,0,0,0.05), inset 0 6px 12px rgba(0,0,0,0.05)'
                }}
            >
                <Container size="xl">
                    <Title order={2} size="h2" fw={700} ta="center" c="dark" mb="xl">About Me</Title>
                    <Grid>
                        <Grid.Col sm={12} md={6}>
                            <Stack spacing="md">
                                {aboutContent.aboutText.map((paragraph, index) => (
                                    <motion.div key={index} custom={index} variants={fadeInUp} initial="hidden" whileInView="visible">
                                        <Text fz="lg" c="dimmed" sx={{ lineHeight: 1.6 }}>{paragraph}</Text>
                                    </motion.div>
                                ))}
                            </Stack>
                        </Grid.Col>
                        <Grid.Col sm={12} md={6}>
                            <Stack spacing="xl">
                                {Object.values(aboutContent.skills).map((skillSet, index) => (
                                    <motion.div key={index} variants={fadeInUp} initial="hidden" whileInView="visible">
                                        <Title order={4} fw={600} c="dark" mb="sm" sx={{ display: 'flex', alignItems: 'center' }}>
                                            {React.createElement(iconMap[skillSet.icon], { size: 20 })}
                                            <Box component="span" ml="xs">{skillSet.title}</Box>
                                        </Title>
                                        <Group spacing="xs">
                                            {skillSet.list.map((skill) => (
                                                <motion.div key={skill} whileHover={{ scale: 1.1 }}>
                                                    <Badge size="md" radius="xl" color="mocha-mousse" variant="light">{skill}</Badge>
                                                </motion.div>
                                            ))}
                                        </Group>
                                    </motion.div>
                                ))}
                            </Stack>
                        </Grid.Col>
                    </Grid>
                </Container>
            </Box>

            {/* Projects Section */}
            <Box id="projects" py={80}
                sx={{
                    background: mantineTheme.colors['mocha-mousse'][1],
                    boxShadow: 'inset 0 -6px 12px rgba(0,0,0,0.06)'
                }}
            >
                <Container size="xl">
                    <Title order={2} size="h2" fw={700} ta="center" c="dark" mb="xl">Featured Projects</Title>
                    <Carousel
                        withIndicators
                        slideSize={{ base: '100%', sm: '50%', md: '33.333%' }}
                        slideGap="xl"
                        align="start"
                        emblaOptions={{ loop: true }}
                        styles={{ controls: { top: '100%' } }}
                    >
                        {projects.map((project) => (
                            <Carousel.Slide key={project.id}>
                                <Paper p="md" shadow="lg" radius="lg" withBorder h="100%" sx={{ transition: 'all 0.3s ease' }}>
                                    <Stack spacing="sm" h="100%">
                                        <Title order={4} fw={700} c="dark">{project.title}</Title>
                                        <Text c="dimmed" fz="sm" sx={{ flexGrow: 1 }}>{project.description}</Text>
                                        <Group spacing="xs">
                                            {project.technologies.map((tech) => (
                                                <Badge key={tech} size="sm" color="mocha-mousse" variant="filled">{tech}</Badge>
                                            ))}
                                        </Group>
                                        <Group spacing="sm">
                                            <Anchor href={project.liveUrl} target="_blank" rel="noopener noreferrer" c="mocha-mousse" sx={{ display: 'flex', alignItems: 'center' }}>
                                                <ExternalLink size={16} /><Text ml="xs">Live Demo</Text>
                                            </Anchor>
                                            <Anchor href={project.githubUrl} target="_blank" rel="noopener noreferrer" c="dimmed" sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Github size={16} /><Text ml="xs">Code</Text>
                                            </Anchor>
                                        </Group>
                                    </Stack>
                                </Paper>
                            </Carousel.Slide>
                        ))}
                    </Carousel>
                </Container>
            </Box>

            {/* Contact Section */}
            <Box id="contact" py={80}
                sx={{
                    background: mantineTheme.colors['cream-accent'][1],
                    boxShadow: '0 -6px 12px rgba(0,0,0,0.08)'
                }}
            >
                <Container size="lg">
                    <Grid>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible">
                                <Title order={3} fw={600} c="dark" mb="md">Let's Connect</Title>
                                <Text fz="lg" c="dimmed" mb="xl" sx={{ lineHeight: 1.6 }}>{contactInfo.intro}</Text>
                                <Stack spacing="md">
                                    {contactInfo.links.map((link, index) => (
                                        <Button
                                            key={index}
                                            component="a"
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            variant={link.text.includes('Email') ? 'filled' : 'outline'}
                                            color="mocha-mousse"
                                            sx={{ transition: 'transform 0.2s ease', '&:hover': { transform: 'scale(1.05)' } }}
                                        >
                                            <Flex justify="center" align="center" gap="xs" wrap="nowrap">
                                                {React.createElement(iconMap[link.icon])}
                                                <Text>{link.text}</Text>
                                            </Flex>
                                        </Button>
                                    ))}
                                    <Button
                                        component="a"
                                        href={`/${personalInfo.cvFileName}`}
                                        download
                                        variant="filled"
                                        color="mocha-mousse"
                                    >
                                        <Flex justify="center" align="center" gap="xs" wrap="nowrap">
                                            {React.createElement(iconMap['Download'])}
                                            <Text>Download My CV</Text>
                                        </Flex>
                                    </Button>
                                </Stack>
                            </motion.div>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <ContactForm />
                        </Grid.Col>
                    </Grid>
                </Container>
            </Box>

            {/* Footer */}
            <Box sx={{ background: mantineTheme.colors['mocha-mousse'][9] }} py="xl">
                <Container size="xl" ta="center">
                    <Text c="white">&copy; 2025 {personalInfo.name}. Built with React and Mantine.</Text>
                </Container>
            </Box>
        </Box>
    );
};

export default Portfolio;
