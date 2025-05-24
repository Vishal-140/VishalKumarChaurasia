#!/usr/bin/env node

/**
 * This is a simple script to run code cleanup, formatting, and linting
 * Run with: node lint-fix.js
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const config = {
  srcDir: path.join(__dirname, 'src'),
  ignoreDirs: ['node_modules', 'dist', 'build'],
  fileTypes: ['.js', '.jsx', '.css']
};

// ANSI colors for prettier output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

// Helper to print colored text
const print = {
  info: (text) => console.log(`${colors.blue}[INFO]${colors.reset} ${text}`),
  success: (text) => console.log(`${colors.green}[SUCCESS]${colors.reset} ${text}`),
  warning: (text) => console.log(`${colors.yellow}[WARNING]${colors.reset} ${text}`),
  error: (text) => console.log(`${colors.red}[ERROR]${colors.reset} ${text}`),
  header: (text) => console.log(`\n${colors.cyan}=== ${text} ===${colors.reset}\n`)
};

// Find all files recursively
function findFiles(dir, filelist = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filepath = path.join(dir, file);
    
    // Skip ignored directories
    if (config.ignoreDirs.includes(file) && fs.statSync(filepath).isDirectory()) {
      return;
    }
    
    if (fs.statSync(filepath).isDirectory()) {
      filelist = findFiles(filepath, filelist);
    } else {
      // Only include files with specified extensions
      if (config.fileTypes.includes(path.extname(filepath))) {
        filelist.push(filepath);
      }
    }
  });
  
  return filelist;
}

// Remove unused imports
function cleanupImports(files) {
  print.header('Cleaning up unused imports');
  let count = 0;
  
  files.filter(file => ['.js', '.jsx'].includes(path.extname(file))).forEach(file => {
    try {
      const content = fs.readFileSync(file, 'utf8');
      
      // Simple regex to find unused imports
      const unusedImportRegex = /import\s+{\s*([^}]+)\s*}\s+from\s+['"][^'"]+['"];/g;
      const allMatches = [...content.matchAll(unusedImportRegex)];
      
      allMatches.forEach(match => {
        const imports = match[1].split(',').map(i => i.trim());
        const unusedImports = imports.filter(importName => {
          // Check if import is actually used in the file
          const importNameTrimmed = importName.split(' as ')[0].trim();
          const escapedName = importNameTrimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const usageRegex = new RegExp(`\\b${escapedName}\\b`, 'g');
          
          // Count occurrences, subtract the import statement itself
          const occurrences = (content.match(usageRegex) || []).length;
          return occurrences <= 1; // If only appears in import statement, it's unused
        });
        
        if (unusedImports.length > 0) {
          print.info(`Found unused imports in ${path.relative(__dirname, file)}: ${unusedImports.join(', ')}`);
          count++;
        }
      });
    } catch (err) {
      print.error(`Error processing ${file}: ${err.message}`);
    }
  });
  
  if (count === 0) {
    print.success('No unused imports found.');
  } else {
    print.warning(`Found potentially unused imports in ${count} files. Please review manually.`);
  }
}

// Format CSS files
function formatCSS(files) {
  print.header('Formatting CSS files');
  let formatted = 0;
  
  files.filter(file => path.extname(file) === '.css').forEach(file => {
    try {
      let content = fs.readFileSync(file, 'utf8');
      
      // Simple CSS formatting for demonstration
      // In a real project you'd use a proper CSS formatter
      const formattedContent = content
        .replace(/\s*{\s*/g, ' {\n  ') // Format opening braces
        .replace(/;\s*/g, ';\n  ')     // Put each property on a new line
        .replace(/\s*}\s*/g, '\n}\n') // Format closing braces
        .replace(/\n\s*\n/g, '\n')    // Remove empty lines
        .trim();
      
      if (content !== formattedContent) {
        fs.writeFileSync(file, formattedContent, 'utf8');
        print.success(`Formatted ${path.relative(__dirname, file)}`);
        formatted++;
      }
    } catch (err) {
      print.error(`Error formatting ${file}: ${err.message}`);
    }
  });
  
  if (formatted === 0) {
    print.success('All CSS files are already properly formatted.');
  } else {
    print.success(`Formatted ${formatted} CSS files.`);
  }
}

// Check for console logs
function checkConsoleLogs(files) {
  print.header('Checking for console.log statements');
  let count = 0;
  
  files.filter(file => ['.js', '.jsx'].includes(path.extname(file))).forEach(file => {
    try {
      const content = fs.readFileSync(file, 'utf8');
      const consoleLogRegex = /console\.log\(/g;
      const matches = content.match(consoleLogRegex) || [];
      
      if (matches.length > 0) {
        print.warning(`Found ${matches.length} console.log statements in ${path.relative(__dirname, file)}`);
        count += matches.length;
      }
    } catch (err) {
      print.error(`Error checking ${file}: ${err.message}`);
    }
  });
  
  if (count === 0) {
    print.success('No console.log statements found.');
  } else {
    print.warning(`Found ${count} console.log statements. Consider removing them for production.`);
  }
}

// Generate size report
function generateSizeReport(files) {
  print.header('File Size Report');
  
  // Group files by type
  const filesByType = {};
  
  files.forEach(file => {
    const ext = path.extname(file);
    if (!filesByType[ext]) {
      filesByType[ext] = [];
    }
    
    const stats = fs.statSync(file);
    filesByType[ext].push({
      path: path.relative(__dirname, file),
      size: stats.size
    });
  });
  
  // Print report
  Object.keys(filesByType).forEach(ext => {
    const totalSize = filesByType[ext].reduce((sum, file) => sum + file.size, 0);
    const averageSize = Math.round(totalSize / filesByType[ext].length);
    
    print.info(`${ext.toUpperCase()} Files (${filesByType[ext].length}): Total ${formatBytes(totalSize)}, Avg ${formatBytes(averageSize)}`);
    
    // List the 3 largest files
    const largest = filesByType[ext]
      .sort((a, b) => b.size - a.size)
      .slice(0, 3);
    
    largest.forEach(file => {
      console.log(`  - ${file.path}: ${formatBytes(file.size)}`);
    });
    
    console.log();
  });
}

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Main execution
try {
  print.header('Starting Portfolio Code Cleanup');
  
  const files = findFiles(config.srcDir);
  print.info(`Found ${files.length} files to process`);
  
  cleanupImports(files);
  formatCSS(files);
  checkConsoleLogs(files);
  generateSizeReport(files);
  
  print.header('Code Cleanup Complete');
  print.success('The portfolio codebase has been optimized and cleaned up.');
  print.info('For best results, also run:');
  print.info('  npm run lint');
  print.info('  npm run format');
  
} catch (error) {
  print.error(`Script failed: ${error.message}`);
  process.exit(1);
}
