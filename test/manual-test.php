<?php
namespace App\Tests;

use Illuminate\Support\Facades\Log;

class ManualTest
{
    public function testSingleVariable()
    {
        $user = ['id' => 1, 'name' => 'John Doe'];
        
        // Test Log Variable on this line
        
        // Test DD Variable on this line
        
        // Test Quick Log Variable on this line
        
        // Test Quick DD Variable on this line
    }
    
    public function testMultipleVariables()
    {
        $user = ['id' => 1, 'name' => 'John Doe'];
        $posts = [
            ['id' => 1, 'title' => 'Post 1'],
            ['id' => 2, 'title' => 'Post 2']
        ];
        
        // Test Log Variable with multiple variables
        
        // Test DD Variable with multiple variables
        
        // Test Quick Log Variable with multiple variables
        
        // Test Quick DD Variable with multiple variables
    }
    
    public function testStringWithVariables()
    {
        $email = "user@example.com";
        $message = "User email: {$email}";
        
        // Test Log Variable with string containing variables
        
        // Test DD Variable with string containing variables
        
        // Test Quick Log Variable with string containing variables
        
        // Test Quick DD Variable with string containing variables
    }
    
    public function testTimeExecution()
    {
        // Test Time Execution for single operation
        $result = $this->complexOperation();
        
        // Test Time Execution for loop
        $posts = [
            ['id' => 1, 'title' => 'Post 1'],
            ['id' => 2, 'title' => 'Post 2']
        ];
        foreach ($posts as $post) {
            $this->processPost($post);
        }
    }
    
    public function testRemoveDebugStatements()
    {
        $user = ['id' => 1, 'name' => 'John Doe'];
        \Log::info($user); // Added by DebugBuddy
        
        $posts = [
            ['id' => 1, 'title' => 'Post 1'],
            ['id' => 2, 'title' => 'Post 2']
        ];
        \dd($posts);
        
        $debugBuddyStartTime = microtime(true); // Added by DebugBuddy
        $result = $this->complexOperation();
        \Log::info("Execution time: " . round((microtime(true) - $debugBuddyStartTime) * 1000, 2) . "ms"); // Added by DebugBuddy
    }
    
    private function complexOperation()
    {
        // Some complex operation
        return "result";
    }
    
    private function processPost($post)
    {
        // Process post
        return $post;
    }
} 