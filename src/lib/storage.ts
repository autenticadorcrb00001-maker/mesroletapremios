import { RoletaConfig, configPadrao } from '@/types/config';

const STORAGE_KEY = 'configRoleta';
const BACKUP_KEY = 'configRoletaBackup';

export const storageManager = {
  // Salvar configurações
  salvarConfig: (config: RoletaConfig): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      throw new Error('Não foi possível salvar as configurações');
    }
  },

  // Carregar configurações
  carregarConfig: (): RoletaConfig => {
    try {
      const configSalva = localStorage.getItem(STORAGE_KEY);
      if (configSalva) {
        const config = JSON.parse(configSalva);
        return { ...configPadrao, ...config };
      }
      return configPadrao;
    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
      return configPadrao;
    }
  },

  // Fazer backup das configurações atuais
  fazerBackup: (): void => {
    try {
      const configAtual = storageManager.carregarConfig();
      localStorage.setItem(BACKUP_KEY, JSON.stringify(configAtual));
    } catch (error) {
      console.error('Erro ao fazer backup:', error);
    }
  },

  // Restaurar backup
  restaurarBackup: (): RoletaConfig | null => {
    try {
      const backup = localStorage.getItem(BACKUP_KEY);
      if (backup) {
        const config = JSON.parse(backup);
        return { ...configPadrao, ...config };
      }
      return null;
    } catch (error) {
      console.error('Erro ao restaurar backup:', error);
      return null;
    }
  },

  // Restaurar configurações padrão
  restaurarPadrao: (): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(configPadrao));
    } catch (error) {
      console.error('Erro ao restaurar padrão:', error);
      throw new Error('Não foi possível restaurar as configurações padrão');
    }
  },

  // Exportar configurações
  exportarConfig: (): string => {
    const config = storageManager.carregarConfig();
    return JSON.stringify(config, null, 2);
  },

  // Importar configurações
  importarConfig: (configJson: string): RoletaConfig => {
    try {
      const config = JSON.parse(configJson);
      const configCompleta = { ...configPadrao, ...config };
      storageManager.salvarConfig(configCompleta);
      return configCompleta;
    } catch (error) {
      console.error('Erro ao importar configurações:', error);
      throw new Error('Arquivo de configuração inválido');
    }
  },

  // Converter imagem para base64
  imagemParaBase64: (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Erro ao converter imagem'));
        }
      };
      reader.onerror = () => reject(new Error('Erro ao ler arquivo'));
      reader.readAsDataURL(file);
    });
  }
};