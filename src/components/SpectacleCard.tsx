import { Box, Text, Collapse, VStack, HStack, Checkbox, Button, useDisclosure } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import Card from "./Card";

const placeholderImg = 'https://placehold.co/400x250/png?text=No+Image';

export interface SpectacleImage {
  url: string;
  alt?: string;
}

interface RepertoireItem {
  id: string;
  title: string;
  duration: string;
  selected?: boolean;
}

export interface SpectacleCardProps {
  id?: string;
  title: string;
  description: string;
  price: string;
  images: SpectacleImage[];
  gradient?: string;
  flex?: number | string;
  onRepertoireSelect?: (selectedItems: string[]) => void;
}

const SpectacleCard = ({ 
  id,
  title, 
  description, 
  price, 
  images, 
  gradient, 
  flex,
  onRepertoireSelect
}: SpectacleCardProps) => {
  const [currentImageIndex] = useState(0);
  const [repertoire, setRepertoire] = useState<RepertoireItem[]>([]);
  const { isOpen, onToggle } = useDisclosure();
  
  const currentImage = images[currentImageIndex] || { url: placeholderImg, alt: title };

  // Initialize repertoire based on spectacle ID
  useEffect(() => {
    if (id === 'nazareno-y-olivares') {
      setRepertoire([
        { id: 'tientos-tangos', title: 'Tientos y Tangos', duration: '12 min', selected: false },
        { id: 'solea', title: 'Soleá por Bulerías', duration: '10 min', selected: false },
        { id: 'alegrias', title: 'Alegrías de Cádiz', duration: '8 min', selected: false },
        { id: 'taranta', title: 'Taranta', duration: '7 min', selected: false },
        { id: 'fandangos', title: 'Fandangos de Huelva', duration: '9 min', selected: false },
        { id: 'bulerias', title: 'Bulerías', duration: '15 min', selected: false },
      ]);
    }
  }, [id]);

  const handleRepertoireToggle = (itemId: string) => {
    const updatedRepertoire = repertoire.map(item => 
      item.id === itemId ? { ...item, selected: !item.selected } : item
    );
    setRepertoire(updatedRepertoire);
    
    // Notify parent component of selected items
    if (onRepertoireSelect) {
      const selectedItems = updatedRepertoire
        .filter(item => item.selected)
        .map(item => item.id);
      onRepertoireSelect(selectedItems);
    }
  };

  const hasRepertoire = id === 'nazareno-y-olivares';
  const selectedCount = repertoire.filter(item => item.selected).length;

  return (
    <Card 
      variant="spectacle"
      title={title}
      imageUrl={currentImage.url}
      imageAlt={currentImage.alt || title}
      gradient={gradient}
      flex={flex}
      imageHeight="250px"
    >
      <Box mb={4}>
        <Text as="div" color="#f0d680" mb={4}>
          {description}
        </Text>
        
        {hasRepertoire && (
          <Box mt={4}>
            <Button 
              onClick={onToggle} 
              size="sm" 
              variant="outline" 
              colorScheme="orange" 
              rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
              width="100%"
              mb={2}
            >
              {isOpen ? 'Hide Repertoire' : 'View Repertoire Options'}
              {selectedCount > 0 && ` (${selectedCount} selected)`}
            </Button>
            
            <Collapse in={isOpen} animateOpacity>
              <Box 
                borderWidth="1px" 
                borderRadius="md" 
                p={4} 
                bg="rgba(0,0,0,0.2)"
                maxH="200px"
                overflowY="auto"
              >
                <VStack align="stretch" spacing={2}>
                  {repertoire.map((item) => (
                    <HStack key={item.id} spacing={3}>
                      <Checkbox 
                        colorScheme="orange"
                        isChecked={item.selected}
                        onChange={() => handleRepertoireToggle(item.id)}
                      />
                      <Text fontSize="sm" color="white">
                        {item.title} <Text as="span" color="gray.400" fontSize="xs">({item.duration})</Text>
                      </Text>
                    </HStack>
                  ))}
                </VStack>
              </Box>
            </Collapse>
          </Box>
        )}
      </Box>
      
      <Box>
        <Text as="div" fontWeight="bold" color="#cd853f">
          {price}
        </Text>
      </Box>
    </Card>
  );
};

export default SpectacleCard;
