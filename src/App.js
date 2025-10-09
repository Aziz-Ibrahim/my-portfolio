import React, { useState, useEffect, useRef } from 'react';
import {
    Github, ExternalLink,
    Mail, Linkedin, ChevronDown,
    Menu, X, Download, Code,
    Server, Globe, Send, Database,
    ChevronLeft, ChevronRight, Settings,
    Cloud, Brain, Rocket, 
    Calendar
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
    Paper,
    Badge,
    useMantineTheme,
    Burger,
    SimpleGrid,
    Card,
    Modal,
    Image
} from '@mantine/core';
import { useMediaQuery, useDisclosure } from '@mantine/hooks';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

import {
    personalInfo, heroContent, aboutContent, projects, contactInfo
} from './content';
import ContactForm from './ContactForm';
import SocialLink from './SocialLink';

// Icon map
const iconMap = {
    Code, Github, Linkedin, Mail, ChevronDown,
    ExternalLink, Server, Globe, Download,
    Menu, X, Send, Database, ChevronLeft, ChevronRight,
    Settings, Cloud, Brain, Rocket, Calendar
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

// Enhanced Magnetic Card Component with dramatic effects
const MagneticCard = ({ children, delay = 0 }) => {
    const cardRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 12, stiffness: 200 };
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), springConfig);
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), springConfig);
    const scale = useSpring(isHovered ? 1.05 : 1, springConfig);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((e.clientX - centerX) / rect.width);
        y.set((e.clientY - centerY) / rect.height);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            viewport={{ once: true }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            style={{
                width: '100%',
                rotateX,
                rotateY,
                scale,
                transformStyle: 'preserve-3d',
            }}
        >
            {children}
        </motion.div>
    );
};

// Project Card Component with Image and Modal
const ProjectCard = ({ project, index }) => {
    const [opened, { open, close }] = useDisclosure(false);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={open}
                style={{ padding: '8px', width: '100%' }}
            >
                <Paper
                    radius="lg"
                    p="md"
                    withBorder
                    sx={(theme) => ({
                        height: 300,
                        overflow: 'hidden',
                        position: 'relative',
                        cursor: 'pointer',
                        transition: 'all 0.4s ease',
                        transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
                        boxShadow: isHovered ? theme.shadows.xl : theme.shadows.md,
                        border: `2px solid ${isHovered ? theme.colors['mocha-mousse'][6] : theme.colors.gray[3]}`,
                    })}
                >
                    {/* Project Image */}
                    <Box
                        sx={{
                            position: 'relative',
                            width: '100%',
                            height: '100%',
                            overflow: 'hidden',
                        }}
                    >
                        <Image
                            src={project.image || 'https://via.placeholder.com/600x400?text=Project+Image'}
                            alt={project.title}
                            fit="cover"
                            height={300}
                            sx={{
                                transition: 'transform 0.4s ease',
                                transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                            }}
                        />
                        
                        {/* Overlay */}
                        <Box
                            sx={(theme) => ({
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: `linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.8) 100%)`,
                                transition: 'all 0.4s ease',
                                opacity: isHovered ? 1 : 0.7,
                            })}
                        />

                        {/* Title and Badge */}
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                padding: 20,
                                zIndex: 2,
                            }}
                        >
                            <Flex justify="space-between" align="end">
                                <Title order={3} c="mocha-mousse" fw={700}>
                                    {project.title}
                                </Title>
                                {project.featured && (
                                    <Badge size="lg" color="mocha-mousse" variant="filled">
                                        Featured
                                    </Badge>
                                )}
                            </Flex>
                            <Text c="gray" size="sm" mt="xs" opacity={0.9}>
                                Click to view details
                            </Text>
                        </Box>
                    </Box>
                </Paper>
            </motion.div>

            {/* Modal with Project Details */}
            <Modal
                opened={opened}
                onClose={close}
                size="lg"
                title={
                    <Flex align="center" gap="sm">
                        <Title order={2} c='mocha-mousse'>{project.title}</Title>
                        {project.featured && (
                            <Badge size="lg" color="mocha-mousse" variant="filled">
                                Featured
                            </Badge>
                        )}
                    </Flex>
                }
                padding="xl"
                radius="lg"
                zIndex={1000}
            >
                <Stack spacing="lg">
                    {/* Project Image in Modal */}
                    <Image
                        src={project.image || 'https://via.placeholder.com/800x400?text=Project+Image'}
                        alt={project.title}
                        radius="md"
                        fit="contain"
                        height={300}
                    />

                    {/* Description */}
                    <Text size="md" c="dimmed" sx={{ lineHeight: 1.7 }}>
                        {project.description}
                    </Text>

                    {/* Technologies */}
                    <Box>
                        <Title order={5} mb="sm" c="dark">Tech Stack</Title>
                        <Group spacing="xs">
                            {project.technologies.map((tech) => (
                                <Badge 
                                    key={tech} 
                                    size="lg" 
                                    color="mocha-mousse" 
                                    variant="light"
                                    sx={{ fontWeight: 500 }}
                                >
                                    {tech}
                                </Badge>
                            ))}
                        </Group>
                    </Box>

                    {/* Action Buttons */}
                    <Group spacing="md" grow>
                        <Button
                            component="a"
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="filled"
                            color="mocha-mousse"
                            leftIcon={<ExternalLink size={18} />}
                            size="md"
                        >
                            Live Demo
                        </Button>
                        <Button
                            component="a"
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="outline"
                            color="dark"
                            leftIcon={<Github size={18} />}
                            size="md"
                        >
                            View Code
                        </Button>
                    </Group>
                </Stack>
            </Modal>
        </>
    );
};

// Main Portfolio Component
const Portfolio = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const mantineTheme = useMantineTheme();
    const isDesktop = useMediaQuery(`(min-width: ${mantineTheme.breakpoints.sm})`);

    const isSmallScreen = useMediaQuery('(max-width: 768px)');
    const aboutGridCols = isSmallScreen ? 1 : 2;

    // Projects grid responsive cols:
    const isLargeScreen = useMediaQuery(`(min-width: ${mantineTheme.breakpoints.lg})`);
    const isMediumScreen = useMediaQuery(`(min-width: ${mantineTheme.breakpoints.md})`);
    const projectsCols = isLargeScreen ? 3 : (isMediumScreen ? 2 : 1);
    
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
                    backgroundColor: 'rgba(52, 43, 33, 0.95)',
                    backdropFilter: 'blur(10px)',
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

            {/* About Section with Enhanced Magnetic Cards */}
            <Box id="about" py={80}
                sx={{
                    background: mantineTheme.colors['cream-accent'][0],
                    boxShadow: '0 -6px 12px rgba(0,0,0,0.05), inset 0 6px 12px rgba(0,0,0,0.05)'
                }}
            >
                <Container size="xl">
                    <Title order={2} size="h2" fw={700} ta="center" c="dark" mb="xl">About Me</Title>
                    <Grid gutter="xl">
                        <Grid.Col sm={12} md={5} lg={5}>
                            <Stack spacing="md">
                                {aboutContent.aboutText.map((paragraph, index) => (
                                    <motion.div key={index} custom={index} variants={fadeInUp} initial="hidden" whileInView="visible">
                                        <Text fz="lg" c="dimmed" sx={{ lineHeight: 1.8 }}>{paragraph}</Text>
                                    </motion.div>
                                ))}
                            </Stack>
                        </Grid.Col>
                        <Grid.Col sm={12} md={7} lg={7}>
                            <SimpleGrid
                                cols={aboutGridCols}
                                spacing="lg"
                            >
                                {Object.values(aboutContent.skills).map((skillSet, index) => (
                                    <MagneticCard key={index} delay={index * 0.1}>
                                        <Card
                                            shadow="xl"
                                            padding="lg"
                                            radius="md"
                                            sx={(theme) => ({
                                                height: '100%',
                                                minHeight: '180px',
                                                background: `linear-gradient(135deg, ${theme.white} 0%, ${theme.colors['cream-accent'][0]} 100%)`,
                                                transition: 'all 0.3s ease',
                                                border: `3px solid ${theme.colors['mocha-mousse'][2]}`,
                                                boxShadow: '0 8px 32px rgba(100, 77, 69, 0.15)',
                                                '&:hover': {
                                                    borderColor: theme.colors['mocha-mousse'][6],
                                                    boxShadow: `0 20px 60px rgba(100, 77, 69, 0.35), 
                                                                0 0 0 4px ${theme.colors['mocha-mousse'][1]}`,
                                                    background: `linear-gradient(135deg, ${theme.white} 0%, ${theme.colors['mocha-mousse'][0]} 100%)`,
                                                }
                                            })}
                                        >
                                            <Stack spacing="md">
                                                <Flex align="center" gap="sm">
                                                    <Box
                                                        sx={(theme) => ({
                                                            width: 50,
                                                            height: 50,
                                                            borderRadius: '12px',
                                                            background: `linear-gradient(135deg, ${theme.colors['mocha-mousse'][6]} 0%, ${theme.colors['mocha-mousse'][8]} 100%)`,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            boxShadow: '0 4px 16px rgba(100, 77, 69, 0.3)',
                                                            transition: 'all 0.3s ease',
                                                            '&:hover': {
                                                                transform: 'rotate(10deg) scale(1.1)',
                                                                boxShadow: '0 8px 24px rgba(100, 77, 69, 0.5)',
                                                            }
                                                        })}
                                                    >
                                                        {React.createElement(iconMap[skillSet.icon], { size: 24, color: 'white' })}
                                                    </Box>
                                                    <Title order={5} fw={700} c="dark">
                                                        {skillSet.title}
                                                    </Title>
                                                </Flex>
                                                <Group spacing="xs">
                                                    {skillSet.list.map((skill) => (
                                                        <Badge 
                                                            key={skill} 
                                                            size="md" 
                                                            radius="md" 
                                                            color="mocha-mousse" 
                                                            variant="light"
                                                            sx={{ 
                                                                fontWeight: 600,
                                                                transition: 'all 0.2s ease',
                                                                '&:hover': {
                                                                    transform: 'scale(1.1)',
                                                                    cursor: 'default'
                                                                }
                                                            }}
                                                        >
                                                            {skill}
                                                        </Badge>
                                                    ))}
                                                </Group>
                                            </Stack>
                                        </Card>
                                    </MagneticCard>
                                ))}
                            </SimpleGrid>
                        </Grid.Col>
                    </Grid>
                </Container>
            </Box>

            {/* Projects Section - Image Grid with Modals */}
            <Box id="projects" py={80}
                sx={{
                    background: mantineTheme.colors['mocha-mousse'][1],
                    boxShadow: 'inset 0 -6px 12px rgba(0,0,0,0.06)'
                }}
            >
                <Container size="xl">
                    <Title order={2} size="h2" fw={700} ta="center" c="dark" mb="xl">Featured Projects</Title>
                    <SimpleGrid
                        cols={projectsCols}
                        spacing="xl"
                    >
                        {projects.map((project, index) => (
                            <ProjectCard key={project.id} project={project} index={index} />
                        ))}
                    </SimpleGrid>
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